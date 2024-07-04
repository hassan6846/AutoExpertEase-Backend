const express = require('express');
const router = express.Router()//router for nested routes

//contollers
const { UploadCar,GetCarById,GetApprovedCars,updateCarStatus } = require('../controllers/CarControllers');
router.route('/car').get(GetApprovedCars)
router.route('/car/upload').post(UploadCar)
router.route('/car/:id').get(GetCarById);
router.route('/car/update/:id').put(updateCarStatus)
module.exports = router;
