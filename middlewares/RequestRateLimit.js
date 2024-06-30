const RateLimit = require("express-rate-limit")

//LoginRequestLimit to prevent Bruteforce and other attack...
const LoginRequestLimits = RateLimit({
    windowMs: 60 * 60 * 1000, // 1hrs
    limit: 5,
    standardHeaders: 'draft-7', // Set `RateLimit` and `RateLimit-Policy` headers
    legacyHeaders: false,
    message: { message: 'Too many Requests from this IP, please try again after an hour, Kindly Dont Spam Server' }
})


//Admin Login Request
const AdminLoginLimit=RateLimit.rateLimit({
    windowMs: 60 * 60 * 1000, // 1hrs
    limit:20,
    standardHeaders: 'draft-7', // Set `RateLimit` and `RateLimit-Policy` headers
    legacyHeaders: false,
    message: { msg: 'Too many Requests from this IP, please try again after an 1hr, Kindly Dont Spam Server' }
})


module.exports={AdminLoginLimit,LoginRequestLimits}