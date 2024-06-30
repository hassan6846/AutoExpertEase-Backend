const Booking = require("../models/BookingModels");

const CreateBooking = async (req, res) => {
  const { car, bookerId, startDate, endDate,totaldays,pickuptime,bookerPhone} = req.body;
  if (!car || !bookerId || !startDate || !endDate||!totaldays||!pickuptime||!bookerPhone) {
    return res.status(400).json({
      success: false,
      msg: "Please fill all the fields.",
    });
  }
  try {
    const booking = new Booking({
      bookedby:  bookerId,
      car: car,
      startDate: startDate,
      BookerContact:bookerPhone,
      endDate: endDate,
      RentalDays:totaldays,
      PickupTime:pickuptime
    });
    await booking.save();
    res.status(201).json({
      success: true,
      msg: "Booking created successfully",
      booking: booking,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

const GetUserBookings=async(req,res)=>{
    const {id}=req.params
    try {
        const bookings=await Booking.find({ bookedby:id})
        res.status(200).json({
            success: true,
            bookings:bookings
        })
    } catch (error) {
        console.error(err);
        return res.status(500).json({
          success: false,
          msg: "Server Error",
        });
    }
}

module.exports = { CreateBooking,GetUserBookings };
