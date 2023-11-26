const  mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    link : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
        image: {
        type : String,
        default : 'uploads/image/blog.jpg'
    }

},{timestamps : true});
const book_model = mongoose.model('Book' , bookSchema);

module.exports = book_model;
