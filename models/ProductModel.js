const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true
    },
    brand: {
        type: String,
        required: false,
        default: undefined
    },
    description: {
        type: String,
        required: [true, "Please Enter product Description"]
    },
    image: {
        type: [String],
        required: [true, "Kindly Add Some Images to Preview (minimum limit is 3)"],
        validate: {
            validator: function(array) {
                return array.length >= 1 && array.length <= 9;
            },
            message: "Image array should have between 3 and 9 items."
        }
    },
    productcategory: {
        category: {
            type: String,
            required: [true, "Please Enter Category"],
            default: "undefined"
        },
        subcategory: {
            type: String,
            required: [true, "Please enter SubCategory"],
            default: "undefined"
        }
    },
    istrending: {
        type: Boolean,
        default: false
    },
    price: {
        saleprice: {
            type: Number,
            required: [true, "Please Enter product Price"],
            maxLength: [8, "Price cannot exceed 8 characters"]
        },
        beforePrice: {
            type: Number,
            required: [true, "Please Enter product Price"],
            maxLength: [8, "Price cannot exceed 8 characters"]
        },

    },
    postedAt: {
        type: Date,
        default: Date.now()
    },
    productStatus: {
        type: Boolean,
        default: false
    },
    PostedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
