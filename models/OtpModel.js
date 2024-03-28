const mongoose = require("mongoose");
const axios = require("axios");
const { sendOtpPhone } = require("../utils/SendPhoneOtp");

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
        expires: 10 // Document will automatically be deleted after 5 minutes
    }
},{timestamps:true,expireAfterSeconds:60*5});


OtpSchema.pre("save", async function (next) {
    console.log("New Document is saved to the database");
    console.log("isNew flag:", this.isNew); // Log the isNew flag for debugging
    if (this.isNew) {
        console.log("Calling sendOtpPhone...");
        await sendOtpPhone(this.phone, this.otp);
    }
    next();
});


module.exports=OTP=mongoose.model("otp",OtpSchema)