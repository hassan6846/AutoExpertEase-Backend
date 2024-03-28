const express = require("express")
const validator = require("validator")//validator for server side Valdiataion
const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")//models





//Register User

const RegisterUser = async (req, res, next) => {

    //register Requirments
    const {name,email,password,otp } = req.body

    try {



    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server Error from Register Controller"
        })
    }

}


//Login User
const LoginUser = async (req, res, next) => {
    const { phone, password } = req.body;
    //find User Already Exits if he is then Send Etc Things Idk
    //else send that invalid credientials thanks...
    try {

    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server Error from Login Controller"
        })

    }
}

module.exports = { LoginUser, RegisterUser }