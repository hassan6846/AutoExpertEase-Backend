const Expert = require("../models/ExpertModel");
const Task = require("../models/TaskModel");
const User = require("../models/UserModel");

const cloudinaryInstance = require("../utils/Cloudinary");

//Apply Being Expert
const ApplyExpertShip = async (req, res, next) => {
  const {
    firstname,
    lastname,
    userid,
    email,
    phone,
    dateofbirth,
    cnicno,
    cnicfront,
    cnicback,
    photo,
  } = req.body;

  // Check if all fields are provided
  if (
    !firstname ||
    !lastname ||
    !userid ||
    !email ||
    !phone ||
    !dateofbirth ||
    !cnicno ||
    !cnicfront ||
    !cnicback ||
    !photo
  ) {
    return res.status(400).json({
      success: false,
      msg: "Please fill all the fields.",
    });
  }

  try {
    // Check if user has already applied
    const findApplication = await Expert.findOne({ phone });

    if (findApplication) {
      return res.status(409).json({
        success: false,
        msg: "You've already applied for Expertship. We'll notify you after approval.",
      });
    }
    // Convert base64 string to buffer and then to Data URI
    const base64ToDataURI = (base64String) => {
      const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      return `data:image/jpeg;base64,${buffer.toString("base64")}`;
    };
    // Upload images to Cloudinary
    const uploadImageToCloudinary = async (base64String) => {
      const dataURI = base64ToDataURI(base64String);
      const uploadResult = await cloudinaryInstance.uploader.upload(dataURI);
      return uploadResult.secure_url;
    };
    const [cnicfrontUpload, cnicbackUpload, photoUpload] = await Promise.all([
      uploadImageToCloudinary(cnicfront),
      uploadImageToCloudinary(cnicback),
      uploadImageToCloudinary(photo),
    ]);

    // Find user to get avatar
    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found.",
      });
    }

    // Save new application
    const expert = new Expert({
      firstName: firstname,
      LastName: lastname,
      user: userid,
      email,
      phone,
      DateOfBirth: dateofbirth,
      CnicNo: cnicno,
      CnicFront: cnicfrontUpload,
      CnicBack: cnicbackUpload,
      facialVerification: photoUpload,
    });
    //convert
    await expert.save();

    // Respond with success and include avatar
    res.status(201).json({
      success: true,
      msg: "Successfully Applied for Expertship.",
      expert,
      name: user.firstName, // Assuming user.firstname is the field containing the user's first name
      avatar: user.avatar, // Assuming user.avatar is the field containing the avatar URL
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
//Check if already Applied or not..
//Get Topups..
const GetTopup = async (req, res, next) => {
  const { id } = req.params;
  try {
    //Find Expert by ID
    const expert = await Expert.findOne({ user: id });
    // finally Send Topup
    res.status(201).json({
      success: true,
      msg: "Successfully Fetched Topups.",
      topup: expert.topups,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
//Add Topup To Account
const AddTopup = async (req, res) => {
  const { amount, id } = req.body;

  if (!amount) {
    return res.status(400).json({
      success: false,
      msg: "Please Provide Amount.",
    });
  }

  try {
    // Update the balance and find the updated expert document
    const expert = await Expert.findOneAndUpdate(
      { user: id },
      { $inc: { topups: amount } },
      { new: true }
    );

    if (!expert) {
      return res.status(404).json({
        success: false,
        msg: "Expert not found.",
      });
    }

    // Send Top-up Response
    res.status(201).json({
      success: true,
      msg: "Topup Successfully Added.",
      expert: expert,
    });
  } catch (error) {
    console.error("Error adding top-up:", error);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error.",
    });
  }
};

const PostTask = async (req, res, next) => {
  const {
    title,
    vehciletype,
    description,
    longitude,
    latitude,
    county,
    id,
    imageone,
    imagetwo,
  } = req.body;

  // Check if any required field is missing
  if (
    !title ||
    !vehciletype ||
    !description ||
    !longitude ||
    !latitude ||
    !county ||
    !id ||
    !imageone ||
    !imagetwo
  ) {
    return res.status(400).json({
      success: false,
    });
  }

  try {
    // Convert base64 string to buffer and then to Data URI
    const base64ToDataURI = (base64String) => {
      const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      return `data:image/jpeg;base64,${buffer.toString("base64")}`;
    };

    // Upload images to Cloudinary
    const uploadImageToCloudinary = async (base64String) => {
      const dataURI = base64ToDataURI(base64String);
      const uploadResult = await cloudinaryInstance.uploader.upload(dataURI);
      return uploadResult.secure_url;
    };

    // Upload all three images
    const [uploadedImage1, uploadedImage2] = await Promise.all([
      uploadImageToCloudinary(imageone),
      uploadImageToCloudinary(imagetwo),
    ]);
    const task = new Task({
      title: title,
      vehicleType: vehciletype,
      description: description,
      LocationCoordinates: {
        Latitude: latitude,
        Longitude: longitude,
      },
      image:[uploadedImage1,uploadedImage2],
      NearbyPlace:county,
      Postedby:id,

    });
    await task.save()
    res.status(201).json({
      success: true,
      msg: "Successfully Posted Task.",
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

const GetAllTasks=async(req,res,next)=>{
  try{
  const tasks=await Task.find()
  res.status(200).json({
    tasks:tasks
  })
  }catch(err){
    console.error(err);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
}

module.exports = { ApplyExpertShip, GetTopup, PostTask, AddTopup,GetAllTasks };
