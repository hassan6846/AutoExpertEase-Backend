const mongoose = require("mongoose")

const LocationSchema = new mongoose.Schema({
    User: {
        type: String,
    },
    latitude: {
        type: String,
        required: true,
        default: "-57.7874"
    },
    longitude: {
        type: String,
        required: true,
        default: "152.7894"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    isArrived:{
        type: Boolean,
        default: false,
        required: true,
    },
    
}, { timestamps: true })

const Location = mongoose.model("location", LocationSchema);

module.exports = Location;