const JWT = require('jsonwebtoken')
const verifyToken = (req , res , next)=>{
 const auth_header = req.headers['Authorization'] || req.headers['authorization'];
 if (!auth_header) {
  return res.json({status : "fail" , data :'token is require'});
 }
 const token = auth_header.split(' ')[1];
try {
 const currentUser =  JWT.verify(token , process.env.JWT_SECRET_KEY);
 req.currentUser = currentUser;
 next();
} catch (error) {
 return res.json('invalid token');
} 

}
module.exports = verifyToken;
