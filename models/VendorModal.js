const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
    user: {
        type:String,
        required: true,
    },
    shopName: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
    },
    contactInfo: {
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },
        phone: {
            type:String,
            required:true
        },
        // Reference to user's phone number

    },
    ntnNumber: {
        type: String,
        required: true,

        // You may add validation for NTN format here
    },
    vendorDetails: {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        cnic: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            // You may add validation for CNIC format here
        },

        // Other vendor details such as date of birth, nationality, etc.
    },
    avatar:{
        type: String,
    
    },
    isVendor:{
        type:Boolean,
        default:false,
    
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
    
});

const Vendor = mongoose.model('Vendor', VendorSchema);

module.exports = Vendor;
