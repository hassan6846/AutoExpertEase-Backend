const express = require('express')
const router = express.Router()//router for nested routes

//controllers
const {ApplyExpertShip,GetTopup,AddTopup,PostTask,GetAllTasks,DeleteMyTask,GetTaskbyId,PostOffer,GetAllOffers}=require("../controllers/ExpertController")

router.route("/apply-expert").post(ApplyExpertShip)
router.route('/add-topup').post(AddTopup)
router.route('/get-topup/:id').get(GetTopup)
router.route('/post-task').post(PostTask)
router.route('/get-tasks').get(GetAllTasks)
router.route('/get-tasks/:id').get(GetTaskbyId)

router.route('/delete-task/:id').delete(DeleteMyTask)


router.route('/sendoffer').post(PostOffer)
router.route('/offers/:id').get(GetAllOffers)
module.exports = router;
