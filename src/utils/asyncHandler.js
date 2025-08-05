import { request } from "express"
import { Promise } from "mongoose"

const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(res,req,next)).
        catch((err) => next(err))
    }
}

export {asyncHandler}

// const asyncHandler = (func) => async (req,res,next) => {
//     try {
        
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message:err.message
//         })       
//     }
// }