const mongoose = require("mongoose");
const User = require("./UserModel");

const LessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    views:{
        default:1,
        type:Number,
        required:false,
    },
    videoCategory:{
        type:String,
        default:"undefined",
        required:true

    }
});

const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;
