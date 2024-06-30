const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    car: {
        type: Object,
        required: true,
    },
    bookedby: {
        type: String,

    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    BookerContact:{
        type: String,
    },
    RentalDays:{
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        default: 'paid',
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    PickupTime:{
     type:String,
     required:true,
    },

    isActive:{
        type: Boolean,
        default: true,
    }
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
