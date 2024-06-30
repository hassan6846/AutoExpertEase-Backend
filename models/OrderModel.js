const mongoose = require('mongoose');

// Schema Model
const OrderSchema = new mongoose.Schema({
    OrderId: {
        type: String,
        default: () => Math.floor(Math.random() * 999999).toString(), // Generating random Order ID
    },
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            default: "Lahore",
        },
        state: {
            type: String,
            default: "Punjab",
        },
        country: {
            type: String,
            default: "Pakistan",
        },
        pinCode: {
            type: Number,
            default: 54000,
        },
        phoneNo: {
            type: Number,
            required: true,
        },
    },
    products: [{
        type: Object,
        required: true,
    }],
    orderedBy: {
        type: String, // Assuming this is a reference to a user's ID
        required: true,
    },
    orderedAt: {
        type: Date,
        default: Date.now(),
    },
    orderStatus: {
        type: String,
    
    },
    PaymentMethod: {
        type: String,
       
    },
    orderState: {
        type: Boolean,
        default: false, // if shipped then false
    },
    TotalAmount: {
        type: Number,
        required: true,
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
