const express = require("express");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const OTP = require("../models/OtpModel");
const GenOtp = require("otp-generator")




const Login = async (req, res, next) => {
    //find
    const { phone, password } = req.body;
    //if Empty Request...
    if (!phone || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields",
        });
    }
    try {
        //find user by phone
        const FindByPhone = await User.findOne({ phone })
        if (!FindByPhone) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credientials",
            });
        }
        res.json({
            success: true,
            message: "Login Successfull",
            token:"Token"
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Error While Logging",
        });
    }

}
const Register = async (req, res, next) => {
    try {
        const { name, password, email, phone, otp, deviceName } = req.body;

        // Check if any required field is missing
        if (!name || !password || !email || !phone || !otp) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email",
            });
        }

        // Validate phone number format
        if (!validator.isNumeric(phone)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Phone Number",
            });
        }

        // Check if phone number is already associated with another account
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Phone is Already Associated With Another account",
            });
        }

        // Check if OTP is correct
        const existingOTP = await OTP.findOne({ phone });
        if (!existingOTP || existingOTP.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // Create the user
        const newUser = await User.create({
            name,
            password,
            email,
            phone,
            otp,
            deviceName,
        });
        
        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            user: newUser, // Optionally return the created user data
        });

    } catch (error) {
        console.error("Error while registering:", error);
        return res.status(500).json({
            success: false,
            message: "Error while registering",
        });
    }
};

//SendOtp
const SendOtp = async (req, res, next) => {
    const { phone } = req.body;
    const GenOtp = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP

    try {
        //save otp in to the model and it will be expire after 5 min or 10
        await OTP.create({ phone: phone, otp: GenOtp })
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error sending OTP",
        });
    }


}

module.exports = { SendOtp, Login, Register };
