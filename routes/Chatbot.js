const express=require("express")
const router=express.Router()

///Controllers
const {ChatBot}=require("../controllers/ChatbotControllers")



router.route('/help').post(ChatBot)




//export
module.exports=router