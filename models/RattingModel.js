const mongoose = require("mongoose")

const RattingSchema=new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
})