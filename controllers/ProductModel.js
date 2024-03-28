const mongoose = require("mongoose")
const User = require("./UserModel")
const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true
    },
    brand: {
        default: undefined,
        required: false,
        type: String,
    },
    description: {
        type: String,
        required: [true, "Please Enter product Description"],
    },
    //images
    image: {
        type: Array,
        required: [, "Kindly Add Some Images to Preview lowest limit is 3 "],
        minItems: [3, "Price cannot exceed 8 characters"],
        maxItems: [9, "Image limits Exceds."]
    },
    tags: {
        type: Array,
        default: [],
        required: [true, "kindly Enter Tags it Helps to Filter"],
        maxlength: [20, "Please dont add too much Tags"],
        minlength: [2, "please Enter Few Tags this Helps to filteration"]
    },
    //category
    productcategory: {
        category: {
            type: String,
            required: [true, "Please Enter Category"],
            default: "undefined",
        },
        subcategory: {
            type: String,
            default: "undefined",
            required: [true, "Please enter SubCategory"],
        }
    },
    //Setting Product is Trending Or not
    istrending: {
        type: Boolean,
        default: false
    },
    //price
    price: {
        saleprice: {
            type: Number,
            required: [true, "Please Enter product Price"],
            maxLength: [8, "Price cannot exceed 8 characters"],
        },
        beforePrice: {
            type: Number,
            required: [true, "Please Enter product Price"],
            maxLength: [8, "Price cannot exceed 8 characters"],
        }
    },
    stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        minLength: [1, "Stock cannot be low "],
        default: 1,
    },
    //Product Reviews
  Review: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    }],
    //posted and created date
    postedAt: {
        type: Date,
        default: Date.now,
    },
    productStatus:{
        type:String,
        required:false,
        default:"unactive"
    }

})

//Making Model
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;

