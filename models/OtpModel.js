const mongoose = require("mongoose");
const axios = require("axios");
const mailSender = require("../utils/SendMail");

const OtpSchema = new mongoose.Schema({
    phone: {
        type: Number,
    
    },
    otp: {
        type: Number,
    
    },
    email: {
        type: Number,
        required: true,
    },
    EmailOtp: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 10 // Document will automatically be deleted after 5 minutes
    }
}, { timestamps: true, expireAfterSeconds: 60 * 5 });

//define function to send otp
async function sendVerficationEmail(email, EmailOtp) {
    try {
        const mailResponse = await mailSender(email,EmailOtp)
        console.log("Email Sent sucessfully",mailResponse)
    } catch (error) {

    }     console.log(error)
}

OtpSchema.pre("save", async function (next) {
//only send if new document is created 
    if(this.isNew){
        await sendVerficationEmail(this.email,this.EmailOtp)
    }
    next()
});


module.exports = OTP = mongoose.model("otp", OtpSchema)