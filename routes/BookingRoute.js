const express = require('express');
const router=express.Router();

// controllers
const { CreateBooking,GetUserBookings } = require('../controllers/BookingControllers');
///

router.route('/booking').post(CreateBooking);
router.route('/booking/:id').get(GetUserBookings)

module.exports = router;

// c:\Users\pc\Documents\GitHub\AliShan\AutoExpertEase\backend\routes\BookingRoutes.js