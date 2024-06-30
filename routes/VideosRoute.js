const express=require("express")
const router=express.Router()

//Import all Controllers
const { UploadVideo,AllVideos,GetSingleVideo,uploadvideo} = require("../controllers/VideoControllers")

router.route("/video").post(UploadVideo)//upload A single video
router.route("/getallvideos").get(AllVideos)
router.route('/video/:id').get(GetSingleVideo)
router.route('/upload').post(uploadvideo)
module.exports=router