const Books = require('../db/books.model');
const httpStatus = require('../utils/httpStatus')
const asyncWrapper = require('../middleWare/asyncWrapper');
const appError = require('../utils/appError') 
/* ====================== Get All Books ================================= */
const getAllBooks = async (req , res) =>{
    const query = req.query;
    const limit = query.limit || 20;
    const page = query.page || 1;
    // [ p1 , p2 , p3 , p4 , p5 , p6 , p7 , p8 ]
    const skip = (page - 1) * limit;
    const all = await Books.find({} , {"__v" : false}).limit(limit).skip(skip);
   return res.status(201).json({status : httpStatus.OK , data : all});
}
/* ====================== Add New Book ================================= */
const addBook = asyncWrapper(
    async(req , res , next)=>{
        const {title , description , price , link} = req.body;
            const newBook =  new Books({
                title,
                description,
                price,
                link,
                image : req.file.filename,
            });
            if (!newBook) {
            const error = appError.create(httpStatus.MESSAGE , 404 , httpStatus.FAIL );
            return next(error);                  
            }
            await newBook.save();
           return res.status(200).json({status : httpStatus.SUCCESS , data : {newBook} , data_ar : httpStatus.ADD_BOOK });
});
/* ====================== Search Book By Id ================================= */
const get_single_book = asyncWrapper(
    async (req , res , next)=>{
        const id = req.params.id;
        const get_book = await Books.findById({_id : id});
           if (!get_book) {
            const error = appError.create(httpStatus.MESSAGE , 400 , httpStatus.FAIL );
           return next(error);
           }
          return res.status(200).json({status:httpStatus.SUCCESS , data : get_book});
    }
)
/* ====================== Update Book By Id ================================= */
const update_book = asyncWrapper(
    async (req ,res , next) =>{
        const {title , description , price , link} = req.body;
            const update = await Books.findByIdAndUpdate({_id : req.params.id} , {$set: {
                 title,
                description,
                price,
                link,
                image : req.file.filename
            }});
            if (!update) {
           const error = appError.create(httpStatus.MESSAGE , 404 , httpStatus.FAIL );
           return next(error);
            }
        return res.status(200).json({status : httpStatus.SUCCESS , data : {update} , data_ar : httpStatus.UPDATA_BOOK}); 
    }
)
/* ====================== delete Book By Id ================================= */
const delete_book = asyncWrapper(
     async (req , res , next) =>{
    const del = await Books.findByIdAndDelete({_id : req.params.id});
    if (!del) {
           const error = appError.create(httpStatus.MESSAGE , 404 , httpStatus.FAIL );
            return next(error);
            }
   return res.status(200).json({status : httpStatus.SUCCESS ,  data_ar : httpStatus.DELETE_BOOK});
}
)
// const delAll = asyncWrapper(
//     async(req , res)=>{
//     const del = await Books.deleteMany();
// res.json('success');
// }
// )

module.exports = {
    addBook,
    getAllBooks,
    get_single_book,
    update_book,
    delete_book,
}
