//update location
//retrive location
const Location = require('../models/LocationModel');

//Get location
const GetLocation = async (req, res) => {

    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            msg: "Please provide location id"
        });
    }
    try {
        const FindExpert = await Location.findOne({ User: id });
        res.status(200).json({
            FindExpert
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Server Error"
        });
    }
}

//Update location
const UpdateLocation = async (req, res) => {
    const { id, longitude, latitude } = req.body;
    if (!id || !longitude || !latitude) {
        return res.status(400).json({
            success: false,
            msg: "Please provide location id"
        });
    }
    try {

        const FindExpert = await Location.findOne({ User: id });
        if (!FindExpert) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        }
        FindExpert.longitude = longitude;
        FindExpert.latitude = latitude;
        await FindExpert.save();
        res.status(200).json({
            FindExpert,
            success: true,
            msg: "Location updated successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Server Error from update location"
        });
    }
}
module.exports = { GetLocation, UpdateLocation };