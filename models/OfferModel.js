const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  Avatar:{
    type: String,
    default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  },
  taskid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  userid: {
   //Expert id to query.../
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  coordinates: {
    type: String,
    required: true,
  },
});

const Offer = mongoose.model("Offer", OfferSchema);
module.exports = Offer;
