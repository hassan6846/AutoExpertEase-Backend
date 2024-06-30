const express=require("express")
const router=express.Router()
//middlewares
const { AdminLoginLimit } = require("../middlewares/RequestRateLimit")
///controllers
const { AdminLoginFunction,GetUsersNo,GetProductNo,GetAllUsers,GetAllCars,RecentSignups,DeleteUser,GetUnapprovedProducts,ApproveProduct,
    GetUnapprovedCars,
    GetTodayRegistration,CountApprovedVendors,CountApprovedExperts,GetLatestUsers,GetExpertApplications,ApproveExpert,GetVendorApplications,ApproveVendor} = require("../controllers/AdminControllers")

//routes links 

router.route("/admin/login").post(AdminLoginLimit,AdminLoginFunction) //admin login
router.route('/admin/usercount').get(GetUsersNo) //User Counts All Time
router.route('/admin/productscount').get(GetProductNo) //count all products
router.route('/admin/getusers').get(GetAllUsers)//Get All User Objects.
router.route('/admin/cars').get(GetAllCars)//Fetch All Cars
router.route(' ').get(GetUnapprovedCars) //get
router.route('/admin/recentSignups').get(RecentSignups)//get recent signups.
router.delete('/admin/user/:id').delete(DeleteUser) //delete user by id
router.route('/admin/get-unapprovedproducts').get(GetUnapprovedProducts) //get all unapproved products
router.route('/admin/approve-product/:id').put(ApproveProduct) //approve product
router.route('/admin/today-registration').get(GetTodayRegistration) //get today registration
router.route('/admin/approved-vendors').get(CountApprovedVendors) //count approved 
router.route('/admin/approved-experts').get(CountApprovedExperts) //count Experts Approved
router.route('/admin/latest-users').get(GetLatestUsers) //get latest 10 users
router.route('/admin/expert-applications').get(GetExpertApplications) //get expert
router.route('/admin/expert-applications/approve').post(ApproveExpert) //approve expert application
router.route('/admin/vendor-applications').get(GetVendorApplications) //get vendor
router.route('/admin/vendor-applications/approve').post(ApproveVendor) //approve vendor
module.exports=router