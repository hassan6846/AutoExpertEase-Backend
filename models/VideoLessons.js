
const User = require("./UserModel");
const mongoose = require("mongoose")


const LessonSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    UpdatedAt: {
        type: Date,
        default: Date.now
    },
    Likes: {
        type: Number,
        default: 0
    },
    Dislikes: {
        type: Number,
        default: 0
    },
    Video:{
        type:string,
        
    }

})
const Lessons = mongoose.model("Lessons", LessonSchema)
module.exports = Lessons 