const express = require("express");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const OTP = require("../models/OtpModel");
const { sendOtpPhone } = require("../utils/SendPhoneOtp");




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
            token: "Token"
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
    const {name,email,password, phone, otp } = req.body
    try {

    }

    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error While Registering",
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

        sendOtpPhone(phone, GenOtp)
        return res.status(200).json({
            success: true,
            message: `This otp is${GenOtp}`,

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
