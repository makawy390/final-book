const appError = require("../utils/appError");

module.exports = (...roles)=>{
 return (req , res , next)=>{
  console.log(req.currentUser.role);
  if (!roles.includes(req.currentUser.role)) {
   return next(appError.create(`this role is authrized for ${roles} only` , 401))
  }
next();
 }
}