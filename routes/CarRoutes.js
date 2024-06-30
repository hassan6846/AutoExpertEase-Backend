const express = require('express');
const router = express.Router()//router for nested routes

//contollers
const { UploadCar,GetCarById,GetApprovedCars } = require('../controllers/CarControllers');
router.route('/car').get(GetApprovedCars)
router.route('/car/upload').post(UploadCar)
router.route('/car/:id').get(GetCarById)
module.exports = router;
