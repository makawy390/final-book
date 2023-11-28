const express = require('express');
const router = express.Router();
const multer = require('multer');
const diskStroage = multer.diskStorage({
 destination : (req,file,cb)=>{
  cb(null , 'uploads/profile')
 },
 filename : (req , file , cb)=>{
  console.log(file.originalname.split('.')[0]);
  const ext = file.mimetype.split('/')[1];
  const fileName = `${file.originalname.split('.')[0]}-profile-${Date.now()}.${ext}`
  cb(null , fileName)
 }
});
const fileFilter = (req , file , cb)=>{
 const imageType = file.mimetype.split('/')[0];
 if (imageType === 'image') {
  return cb(null , true)
 }else{
  cb("this file must be an image" , false)
 }
}
const upload = multer({storage : diskStroage , fileFilter});
const {getAllUsers , register , login , updateUser , deleteUser , profile} = require('../controller/user.controller');
const verifyToken = require('../middleWare/verifyToken');
const allowedTo = require('../middleWare/allowedTo');
// const funcCloudinary = require('../middleWare/funcCloundinary');
router.route('/')
.get(verifyToken,allowedTo('admin','manager'),getAllUsers);

router.route('/register')
.post(upload.single('profile'),register);

router.route('/login')
.post(login);

router.route('/view/:id')
.get(verifyToken,profile);

router.route('/update-profile/:id')
.patch(verifyToken,upload.single('profile'),updateUser);

router.route('/delete-profile/:id')
.delete(verifyToken,allowedTo('admin', 'manager'),deleteUser);

module.exports = router;
