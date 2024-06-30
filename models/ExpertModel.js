const mongoose = require("mongoose")
const User=require("../models/UserModel")
const ExpertSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: false,
   },
   LastName: {
      type: String,
      required: false
   },
   phone:{
      type: String,
   },
   topups: {
      type: Number,
      default: 0
   },
   email:{
      type: String,
      required:false,
   },
   user: {
      type: String,
      required:true,
    //populate

   },
   DateOfBirth: {
      type: String,
      default: "",
   },
   ExpertContact: {
      type: String,
      required:false,
   },
   CnicNo:{
      type: String,
      required:false,
   },
   CnicFront: {
      type: String,
      required:false,

   },
   CnicBack: {
      type: String,
      default: ""
   },
   facialVerification:{
      type:String,
      default:"",
   },
   NoTasks:{
      default:0,
      type:Number,
      required:false,
   },
   TotalEarnings:{
      default:0,
      type:Number,
      required:false,
   },
   AccountNo:{
      default:0,
      type:Number,
      required:false,
   },
   createdAt:{
      type: Date,
      default: Date.now()
   },
   isExpert:{
   type: Boolean,
   default: false,
   required: false,

   },//post rating and comments


}, { timestamps: true })
const Expert = mongoose.model('Expert', ExpertSchema)
module.exports = Expert;
