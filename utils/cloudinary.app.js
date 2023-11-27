// import {v2 as cloudinary} from 'cloudinary';
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dyiz0brax', 
  api_key: '542276447168822', 
  api_secret: 'LnaEPuvhvYSGQrDXUK4jpJTLF5k' 
});
module.exports = cloudinary;
