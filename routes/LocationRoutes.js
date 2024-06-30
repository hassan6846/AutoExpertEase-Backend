const express = require("express");
const router=express.Router();

// Import Controllers
const {GetLocation,UpdateLocation}=require("../controllers/LocationController")

// Routes
router.get("/location/:id", GetLocation);
router.put("/location/update", UpdateLocation);

module.exports = router;