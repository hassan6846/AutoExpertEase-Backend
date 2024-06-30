//Get ALl Active Orders
//GEt ALl ORders
//GET EARNINGS...
//Get ALl ORDER OF A PARTICULAR PERSON BY ID
//CREATE ORDERS.. 
//UPDATE ORDERS..
//Get My Orders Vendor only

//Rate Product.

const Order = require("../models/OrderModel")
const Product = require("../models/ProductModel")
const User = require("../models/UserModel")


//required controllers

const CreateProductOrder = async (req, res, next) => {
    const { products, address, orderbyid, paymentmethod, phone, total } = req.body;

    // Check if any required field is missing
    if (!products || !address || !orderbyid || !paymentmethod || !phone || !total) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        // Create new order
        const newOrder = new Order({
            products: products,
            PaymentMethod: paymentmethod,
            orderedBy: orderbyid,
            shippingInfo: {
                phoneNo: phone, // Correct field name based on the schema
                address: address,
            },
            TotalAmount: total,
        });

        // Save the order to the database
        await newOrder.save();

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Order Created Successfully",
            order: newOrder
        });
    } catch (err) {
        console.error(err);

        // Send error response
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const GetUserOrders = async (req, res, next) => {
    const { id } = req.params;
    try {
        const findOrder = await Order.find({ orderedBy: id,orderState:false});

        return res.status(200).json({
            success: true,
           order: findOrder
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
const fetchCompletedOrdersUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const findOrder = await Order.find({ orderedBy: id, orderState: true });
        res.json({ success: true, order: findOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
const GetOrderDetails = async (req, res, next) => {
    const { id } = req.params;
    try {
     const FindOrderDetails = await Order.findById(id);
     res.json({ success: true, order: FindOrderDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
module.exports = { CreateProductOrder, GetUserOrders, fetchCompletedOrdersUser,GetOrderDetails }