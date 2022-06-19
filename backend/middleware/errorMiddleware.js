const notFound = (req,res,next)=>{
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}


const errorHandler = (err,req,res,next)=>{
    //some times error are thrown with status code of 200 so change it to 500
    const statusCode = res.statusCode === 200?500:res.statusCode 
    res.status(statusCode)
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV === "production"?null:err.stack,
    })
}

export {notFound,errorHandler}