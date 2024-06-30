const express=require('express')
const router=express.Router()

//controllers
const { ApplyForVendor, FindVendorProduct } = require('../controllers/VendorController')


//Routes
router.route('/vendor/apply').post(ApplyForVendor)
router.route('/vendor/get-orders/:id').get(FindVendorProduct)
module.exports = router;