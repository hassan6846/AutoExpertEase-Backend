// Models
const OTP = require("../models/EmailOtpModel");
// Utils
const { GenerateOtp } = require("../utils/GenerateOtp");
// Senders
const { SendOtpMail } = require("../utils/SendMail"); // Mailer

const SendEmailOtp = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            success: false,
            msg: "Please fill all the fields.",
        });
    }
    try {
        const otp = GenerateOtp(); // Generate the OTP

        // Send OTP email
        await SendOtpMail(email, "Verification Code for Email", `Your Verification Code for AutoExpertEase ${otp}`);

        // Create and save OTP document
        const otpDocument = new OTP({ email, otp });
        await otpDocument.save();

        // Send success response
        res.status(200).json({ message: "OTP sent successfully to email" });
    } catch (error) {
        console.error(error);

        // Only send the error response if headers have not been sent yet
        if (!res.headersSent) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

const VerifyEmail = async (req, res, next) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: "Please provide both email and OTP" });
    }

    try {
        // Find the latest OTP document for the given email
        const latestOTP = await OTP.findOne({ email }).sort({ createdAt: -1 }).exec();
        if (!latestOTP) {
            return res.status(404).json({ error: "OTP not found" });
        }

        if (latestOTP.otp === otp) {
            // OTP is valid
     
            return res.status(200).json({ message: "OTP verified successfully" });
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
module.exports = { SendEmailOtp, VerifyEmail };
