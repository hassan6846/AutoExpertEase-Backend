const express = require('express')
const router = express.Router()//router for nested routes

//controllers
const {ApplyExpertShip,GetTopup,AddTopup,PostTask,GetAllTasks,DeleteMyTask,SendOffertoTask}=require("../controllers/ExpertController")

router.route("/apply-expert").post(ApplyExpertShip)
router.route('/add-topup').post(AddTopup)
router.route('/get-topup/:id').get(GetTopup)
router.route('/post-task').post(PostTask)
router.route('/get-tasks').get(GetAllTasks)

router.route('/delete-task/:id').delete(DeleteMyTask)


router.route('/sendoffer').post(SendOffertoTask)
module.exports = router;
