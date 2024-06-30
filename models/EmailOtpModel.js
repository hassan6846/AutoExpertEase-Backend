const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { expireAfterSeconds: 30 });

const OTP = mongoose.model("OTP", OtpSchema);
module.exports = OTP;
