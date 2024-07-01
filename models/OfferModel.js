const mongoose=require("mongoose")

const OfferSchema=new  mongoose.model({
 //price
 price:{
    type:Number,
    required:true,
 },
 //time
 time:{
    type:Number,
    required:true,
 },
 //distance
 distance:{
    type:Number,
    required:true,
 },
 //coordinates are ref//joined with object id of expert
 coordinates:{
    type:String,
    required:true,
 }


})


const Offer = mongoose.model("Offer", OfferSchema);
module.exports=Offer
