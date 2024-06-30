const jwt=require("jsonwebtoken")
const User=require("../models/UserModel")

exports.isAuthenticatedUser=async(req,res,next)=>{
    const token=req.headers.token;//get access to headers token
    
    if(!token){
        return next()
    }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET)
}
//is Vendor

//is Admin
