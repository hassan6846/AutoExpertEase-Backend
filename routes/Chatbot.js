const express=require("express")
const router=express.Router()
//controllers
const { ChatBot } = require("../controllers/ChatbotControllers")

router.route("/help").post(ChatBot)

module.exports=router