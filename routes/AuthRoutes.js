const express = require('express')
const router = express.Router()//router for nested routes

const {SendOtp,Login, Register } = require('../controllers/UserControllers')

router.route('/login').post(Login)
router.route('/register').post(Register)
router.route('/sendotp').post(SendOtp)
module.exports=router