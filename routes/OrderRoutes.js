const express = require('express');
const router=express.Router();

//controllers
const { CreateProductOrder ,GetUserOrders,fetchCompletedOrdersUser,GetOrderDetails } = require('../controllers/OrderControllers');

router.route('/create-order').post(CreateProductOrder);
router.route('/order/:id').get(GetUserOrders)//Get all orders of a particular user
router.route('/order/details/:id').get(GetOrderDetails) //Get order details by id single order view...
router.route('/order/history/:id').get(fetchCompletedOrdersUser)//fetch orders that are completed...
module.exports=router;