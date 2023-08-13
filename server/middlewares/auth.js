const jwt = require("jsonwebtoken")
require("dotenv").config();

const User = require("../models/User")

//auth
exports.auth = async(req,res,next) => {
    try {
        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer " , "")

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
          }
    
          //Verify the token
          try {
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            console.log(decode);
    
            req.user = decode
          } catch (error) {
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
          }
    
          //Going to next middleware
          next()


    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token!!"
        })
    }
}

//isStudent
exports.isStudent = async (req,res,next) => {
    try {

        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for student"
            })
        }

        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be varified, please try again"
        })
    }
}

//isInstructor
exports.isInstructor = async (req,res,next) => {
    try {

        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructor"
            })
        }

        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be varified, please try again"
        })
    }
}

//Admin
exports.isAdmin = async (req,res,next) => {
    try {

        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin"
            })
        }

        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be varified, please try again"
        })
    }
}