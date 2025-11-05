const asyncHandler = (fn) => async (req,res,next) => {
    try {
       await fn(req,res,next)
    } catch (err) {
        res.status(err.statusCode || 400).json({
            success: false,
            message: err.message
        })
    }
}

export {asyncHandler} 

// const asyncHandler = (requestHandler) => {
//     (req,res,next) => {
//         Promise.then(requestHandler(req,res,next)).catch((err) => next(err))
//     }
// }