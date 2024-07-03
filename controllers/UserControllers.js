// List of some user controller supported by the app (autoexpertEase).
const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")//json web token
const bcrypt = require("bcrypt")
const cloudinaryInstance = require("../utils/Cloudinary")



const loginFunction = async (req, res) => {
    const { phone, password } = req.body;
    if (!phone || !password) {
        return res.status(400).json({
            success: false,
            msg: "Please fill all the fields.",
        });
    }

    try {
        // Find user by phone
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found.",
            });
        }

        // Compare password
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(401).json({
                success: false,
                msg: "Incorrect password.",
            });
        }

        // Password is correct, generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        // Send success response with token
        return res.status(200).json({
            success: true,
            msg: "Login successful.",
            token: token,
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
const RegisterFunction = async (req, res, next) => {
    const { firstname, lastname, phone, password, email, brand, devicename } = req.body;

    // Check if all fields are provided
    if (!firstname || !lastname || !phone || !password || !email || !brand || !devicename) {
        return res.status(400).json({
            success: false,
            msg: "Please fill all the fields.",
        });
    }

    try {
        // Check if the phone number is already registered
        const FindByPhone = await User.findOne({ phone });
        if (FindByPhone) {
            return res.status(409).json({
                success: false,
                msg: "Phone Already Linked to Another Account",
            });
        }

        // Check if the email is already registered
        const FindByEmail = await User.findOne({ email });
        if (FindByEmail) {
            return res.status(409).json({
                success: false,
                msg: "Email Already Linked to Another Account",
            });
        }

        // Create the user
        const newUser = new User({
            firstName: firstname,
            lastName: lastname,
            phone,
            email:email,
            password,
            DeviceInfo: {
                Brand: brand,
                DeviceName: devicename
            },
            devicename,
        });

        // Save the user to the database
        await newUser.save();

        // Respond with success
        res.status(201).json({
            success: true,
            msg: "User registered successfully",
            user: {
                id: newUser._id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                phone: newUser.phone,
                email: newUser.email,
                brand: newUser.brand,
                devicename: newUser.devicename,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: `${error.message}` });
    }

}
//update profile picture..
const updatepicture = async (req, res, next) => {
    const { image, id } = req.body;

    if (!image || !id) {
        return res.status(400).json({
            success: false,
            msg: "Please fill Entiere fields (from Update picture)",
        });
    }

    try {
        //Find User First
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "User does not exist in the database"
            });
        }
        // Convert base64 string to buffer
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        // Create Data URI
        const dataURI = `data:image/jpeg;base64,${buffer.toString('base64')}`;
        // Send to cloudinary
        const uploadResult = await cloudinaryInstance.uploader.upload(dataURI);
        user.avatar = uploadResult.secure_url;

        await user.save();

        res.status(200).json({
            success: true,
            msg: "Avatar updated successfully",
            avatarUrl: uploadResult.secure_url
        });

    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
};




//Check if user is already Signup or Not...
//in sense of inital registration...
const FindUser = async (req, res, next) => {
    const { phone } = req.body
    // we just have to send boolean to frontend to change state accordingly
    const user = await User.findOne({ phone })
    if (user) {
        return res.status(400).json({
            success: true,
            msg: "User Already Exists.",
        });
    }
    //Else send true
    res.status(200).json({
        success: false,
        msg: "User Not Existed on the database"

    })
    next()

}

//Get Avatar Working 100% State done
const GetAvatar = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            msg: "Please fill all the fields from get  avatar",
        });
    }
    //Find User ..
    try {
        // Find the user
        const user = await User.findById(id);
        // Handle if user does not exist
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "User does not exist in the database"
            });
        }


        // Send success response
        res.status(200).json({
            success: true,
            avatar: user.avatar
        });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({
            success: false,
            msg: "Internal Server Error"

        });
    }
};

///Check is Expert/mechanic
const IsExepert = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            msg: "Please fill all the fields from  Isexpert",
        });
    }
    try {
       //find user by id 
        const user = await User.findById(id);
        if(!user) {
            return res.status(400).json({
                success: false,
                msg: "User does not exist in the database"
            });
        }
        //If user is expert in role array of user
        if(user.role.includes('expert')) {
            return res.status(200).json({
                success: true,
                isExpert: true
            });
        }
        //If user is not expert in role array of user
        res.status(200).json({
            success: false,
            isExpert: false
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: `${error.message}` });
    }
}
//Is Seller...
const isVendor=async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            msg: "Please fill all the fields from  IsVendor",
        });
    }

    try {
           //find user by id 
           const user = await User.findById(id);

           if(!user) {
               return res.status(400).json({
                   success: false,
                   msg: "User does not exist in the database"
               });
           }
                   //If user is expert in role array of user
        if(user.role.includes('vendor')) {
            return res.status(200).json({
                success: true,
                isVendor: true
            });
        }
        res.status(200).json({
            success: false,
            isVendor: false
        });
} catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: `${error.message}` });
}
}
//Can Post Cars..
const CanPostCars = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            msg: "Please fill all the fields from  CanPostCars",
        });
    }
    try {
        //find user by id 
        const user = await User.findById(id);
        if(!user) {
            return res.status(400).json({
                success: false,
                msg: "User does not exist in the database"
            });
        }
        //If user is expert in role array of user
        if(user.role.includes('postal') ) {
            return res.status(200).json({
                success: true,
                canPostCars: true
            });
        }
        res.status(200).json({
            success: false,
            canPostCars: false
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: `${error.message}` });
    }
}
//can Rent Cars

const CanRentCars = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            msg: "Please fill all the fields from  CanRentCars",
        });
    }
    try {
        //find user by id 
        const user = await User.findById(id);
        if(!user) {
            return res.status(400).json({
                success: false,
                msg: "User does not exist in the database"
            });
        }
        //If user is expert in role array of user
        if(user.role.includes('rental') ) {
            return res.status(200).json({
                success: true,
                canRentCars: true
            });
        }
        res.status(200).json({
            success: false,
            canRentCars: true
        })} catch (error) {
            console.error(error);
            res.status(500).json({ success: false, msg: `${error.message}` });
        }}

module.exports = { RegisterFunction, loginFunction, FindUser, updatepicture, FindUser, GetAvatar,IsExepert,isVendor,CanPostCars,CanRentCars};
