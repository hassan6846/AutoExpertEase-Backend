const express = require("express");
const validator = require("validator")
const cloudinaryInstance = require("../utils/Cloudinary");


const User = require("../models/UserModel");
const { Lessons } = require("../models/VideoLessons");


//Post a new Video
const PostLesson = async (req, res, next) => {
    const { video,title,description } = req.body
    try {


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports = { PostLesson }