const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  Avatar:{
    type: String,
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
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  coordinates: {
    longitude:{
      type: String,
      required: true,
    },
    latitude:{
      type: String,
      required: true,
    }
  },
});

const Offer = mongoose.model("Offer", OfferSchema);
module.exports = Offer;
