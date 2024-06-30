const express = require('express')
const router = express.Router()//router for nested routes
//controllers
const { SendEmailOtp,VerifyEmail} = require('../controllers/AuthControllers')

router.route('/sendemail').post(SendEmailOtp)
router.route('/verifyemail').post(VerifyEmail)

module.exports = router;
