const otpGenerator=require("otp-generator")
const OTP=require("../models/OtpModel")
const User = require("../models/UserModel")

const SendOtp=async(req,res,next)=>{
    try{
        const {phone}=req.body
        //Check if User Already Presend
        const FindByNum=await User.findOne({phone})
    if(FindByNum){
        return res.status(400).json({message:"User Already Presend"})
    }
    //Generate OTP
    const otp=otpGenerator.generate(6)
    const result=await OTP.findOne({otp:otp})
    console.log("Result is Generate OTP Func");
    console.log("OTP", otp);
    console.log("Result", result);
    while(result){
        otp=otpGenerator.generate(6)
    }
     const otpPayload={phone,otp}
     const otpBody=await OTP.create(otpPayload)
     console.log(otpBody)
     
     res.status(200).json({
        success: true,
        message: `OTP Sent Successfully`,
        otp,
    });
    }
    catch(err){
        console.log(err)
    }
}