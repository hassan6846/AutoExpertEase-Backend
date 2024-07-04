const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    licensePlate: {
        type: String,
        required: true,
 
    },
    RegistrationNo:{
        type: String,
        required: true,
    
    },
    color:{
        type:String,
        default:"undefined",
    },
    Cartype: {
        type: String,
  
        required: true,
    },
    EngineType:{
        type:String,
        defualt:"Gasoline Engine"
    },
    fuelType: {
        type: String,
       
        required: true,
    },
    YearOfManufacture: {
        type: String,
        required: true,
    },
    Milage:{
        type: String,
        required: true,
    
    },
    condition: {
        type: String,
        trim: true,
    },
    seats: {
        type: String,
        required: true,
     
    },
    haveAc: {
        type: String,
        required: true,
    },
    hasTraker:{
        type: String,
        required: true,
    },
    WorkingSoundSystem:{
        type: String,
        required: true,
    },
    LegalDocuments:{
        type: String,
        required: true,
    },
    
    pricePerDay: {
        type: String,
        required: true,
    },
    location: {
        type: Object,
    },
    Address:{
        type: String,
        required: true,
    },
    owner: {
        type:String,
        required: true,
    },
    availability: {
        type: Boolean,
        required: true,
        default: true,
    },
    images: [{
        type: [String],
        required: [true, "Kindly Add Some Images to Preview (minimum limit is 3)"],


    }],

    Address:{
        type:String,
        required: true,
    },

    location:{
        type: Object,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    IsApproved:{
        type:Boolean,
        default:true,
    },
    // Owner details
    
});

// Create the model from the schema
const Car = mongoose.model('Car', CarSchema);

module.exports = Car;
