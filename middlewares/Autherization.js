const jwt=require("jsonwebtoken")

//middleware for authenticated user
exports.isAuthenticated=async (req,res,next)=>{
  //we'll check if the token is pass through the header or not

}
//Authorize roles
exports.authorizeRoles = (allowedRoles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "You are not Autherized to  View this Source..",
        });
      }
  
      const userRole = req.user.role;
  
      if (allowedRoles.includes(userRole)) {
        // User is authorized for the specified roles
        next();
      } else {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to access this resource",
        });
      }
    };
  };