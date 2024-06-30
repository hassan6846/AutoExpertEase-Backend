const express = require('express')
const router = express.Router()//router for nested routes
const { RegisterFunction, updatepicture, loginFunction, FindUser,GetAvatar, IsExepert,isVendor,CanPostCars,CanRentCars} = require("../controllers/UserControllers")

router.route('/avatar').post(updatepicture)
router.route('/register').post(RegisterFunction)
router.route('/login').post(loginFunction)
router.route('/check').post(FindUser)
router.route('/getavatar/:id').get(GetAvatar);
router.route('/check-expert/:id').get(IsExepert);
router.route('/check-vendor/:id').get(isVendor);
router.route('/can-post/:id').get(CanPostCars);
router.route('/can-rent/:id').get(CanRentCars);
// exporting all routes.
module.exports = router;
