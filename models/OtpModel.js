const mongoose = require("mongoose")

const OtpSchema = new mongoose.Schema({

    phone: {
        type: Number,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5//document will automatically deleted after 5min
    }
})
async function sendOtpPhone(phone, otp) {
    try {
        const response=await axios.post("https://api.veevotech.com/v3/sendsms",{
            "apikey": "d593a1cfd2e75e1e08e292b45e2df894",
            "receivernum": phone,
            "sendernum": "Default",
            "textmessage": `The otp Key for AutoExpertEase is${otp}`
        })
    } catch (error) {
        console.log(error.message)
    }
}
OtpSchema.pre("save",async function (next){
    console.log("New Document is saved to database")
    if(this.isNew){
        await sendOtpPhone(this.phone,this.otp)
    }
    next()
})
module.exports=mongoose.model("OTP",OtpSchema)