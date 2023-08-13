const RatingAndReview = require("../models/RatingAndReviews")
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

//createRating
exports.createRating = async(req,res) => {
    try {
        
        const userId = req.user.id;

        const {rating , review , courseId} = req.body;

        const courseDetails = await Course.findOne(
            {
                _id:courseId,
                studentsEnrolled: {$elemMatch: {$eq : userId}},
            }
        )

    if(!courseDetails){
        return res.status(404).json({
            success:false,
            message:"Student is not enrolled in the course"
        })
    }

    const alreadyReviewed = await RatingAndReview.findOne({
        user:userId,
        course:courseId
    })

    if(alreadyReviewed){
        return res.status(403).json({
            success:false,
            message:"Course is already review by the user"
        })
    }

    const ratingReview = await RatingAndReview.create({
        rating , review,
        course:courseId,
        user:userId

    })

    const updatedCourseDEtails =  await Course.findByIdAndUpdate({_id:courseId} , 
            {
                $push: {
                    ratingAndReviews:ratingReview._id,
                }
            },
            {new:true}
        )

    console.log(updatedCourseDEtails);

    return res.status(200).json({
        success:true,
        message:"Rating and review created successfully ",
        ratingReview,
    })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get AverageRating
exports.getAverageRating = async(req,res) => {
    try {

        const {courseId} = req.body;

        const result = await RatingAndReview.aggregate([ 
            {
                $match:{
                course: new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating: {$avg: "$rating"},
                }
            }
        ])

        if(result.length > 0){
            return res.status(200).json({
                success:true,
                message:"Average Rating",
                averageRating: result[0].averageRating // aggregate return a array value
            })
        }

        return res.status(200).json({
            success:true,
            message:"Average Rating is 0 , no rating is given till now",
            averageRating:0 
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//ge all rating
exports.getAllRating = async (req,res) => {
    try {

        const allReviews = await RatingAndReview.find({})
        .sort({rating: "desc"})
        .populate({
            path:"user",
            select:"firstNamr lastName email image",
        })
        .populate({
            path:"course",
            select:"courseName"
        })
        .exec()

        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}