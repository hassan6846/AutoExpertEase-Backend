const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const UserSchema = new mongoose.Schema({
    // userName (for Kyc purposes E.g Real Cnic Name )

    firstName: {
        type: String,
        require: [true, "Kindly Enter your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],//setting max length
        minLength: [2, "Name should have more than 4 characters"],//setting min length
    },
    lastName: {
        type: String,
        require: [true, "Kindly Enter your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],//setting max length
        minLength: [2, "Name should have more than 4 characters"],//setting min length
    },
    email: {
        type: String, //email type 
        required: [true, "Please Enter Your Email"],
        unique: [true, "Email is already Linked to another account."],//prevent duplciate email
        validate: [validator.isEmail, "Please Enter a valid Email Format."],//Validating is Email.
    },
    phone: {
        type: String,
        required: [true, "Kindly Enter the Contact Number"],

    },
    password: {
        type: String,
        minLength: [8, "Password Should have more than 8 characters"],//setting min length

    },
    avatar: {
        type: String,
        required: false,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },

    AddressInfo: {
        //Address
        Address: {
            type: String,
            default: "Address for billing and parcel",
        },
        //Country..
        Country: {
            type: String,
            default: "Pakistan",
        },
        //City..
        City: {
            type: String,
            default: "Lahore"
        },
        State: {
            type: String,
            default: "Punjab"
        },
        //ZipCode.
        ZipCode: {
            type: Number,
            default: 54000,
        }
    },
    // Contain Info About Device Info of the User Device which is primarly used
    //We can Write Algorithms to compare device with new auth device and warn them
    //about suspecius activity.




    DeviceInfo: {

        Brand: { type: String, default: "Unknown" },
        DeviceName: { type: String, default: "Unknown" },

    },


    // UserRoles.
    role: {
        type: [String],
        default: ["user"],
    },
    //we ill set this after putting this
    rolestatus: {
        type: String,
        default: "Pending",
    },
    fatherName: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }

}, { timestamps: true })
//setting index

//hash password before saving it....
UserSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
// HASH COMPARE METHOD
UserSchema.methods.comparePassword = async function (password) {
    return await bycrypt.compare(password, this.password);
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
//Making Model & Exporting It.
