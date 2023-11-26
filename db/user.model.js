const  mongoose = require("mongoose");
const validator= require('validator')
const userSchema = new mongoose.Schema({
    first_name : {
        type : String,
        required : true,
    },
    last_name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate : [validator.isEmail , "filed must be a vaild Email"]
    },
    password : {
        type : String,
        required : true
    },
    gender :{
        type : String,
        enum : ["female" , "male"],
        required : true,
    },
    role : {
        type : String, // ['user' , 'admin' , 'manger']
        enum : ["user" , "admin" , "manager"],
        default : "user"
    },
    country:{
        type : String,
        require : true
    },
     profile:{
    type: String,
    default:'uploads/profile/user.png'
   },
   description :{
    type : String,
    require : true
   },
   token:{
    type : String
   },

})

module.exports = mongoose.model("User" , userSchema)
