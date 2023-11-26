module.exports = (asycFn)=>{
    return (req ,res ,next)=>{
        asycFn(req,res,next).catch((err)=>{
            next(err)
        })  
    }
}