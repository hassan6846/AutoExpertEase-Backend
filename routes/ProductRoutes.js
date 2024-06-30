const express = require('express')
const router = express.Router()
const { CreateProductListing,FetchSellerProducts,AllProducts,GetProductById,FetchApprovedProducts,SearchProducts,GetProductsBySubcategory} = require("../controllers/ProductControllers")
router.route('/product/create').post(CreateProductListing) //Vendor Only can create product
router.route("/products/vendor/:id").get(FetchSellerProducts)//get all product being posted by a vendor 
router.route("/products/vendor/active/:id").get(FetchApprovedProducts)//get active Products by vendor
router.route("/product").get(AllProducts)//get all products
router.route("/product/:id").get(GetProductById)//get a single product by id 
router.route("/products/search/:query").get(SearchProducts)//get a single product by id 
router.route('/products/category/:query').get(GetProductsBySubcategory)  //Get All Products by Subcategory
// exporting all routes.

module.exports = router;