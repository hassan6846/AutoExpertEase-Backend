const express=require("express")
const router=express.Router()
//controllers
const { CreatePayment } = require("../controllers/PaymentController");

//ROutes
router.route("/intents").post(CreatePayment)
module.exports = router;
