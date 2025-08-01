const Lecture = require("../models/lecture.model");
const Comment = require("../models/comment.model")

module.exports.createCommnet = async (req, res) => {
    try {
        const { comment } = req.body;
        const userId = req.user
        const {lectureId} = req.params;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(500).json({ message: "lecture not found" });
        }
        const newComment = new Comment({
            userId,
            comment
        })
        if (!lecture.comments) lecture.comments = [];
        lecture.comments.push(newComment._id);
        await lecture.save();
        await newComment.save()
        return res.status(200).json({ message: "comment sent" })
    } catch (error) {
        console.log("createCommnet", error)
        res.status(500).json({ message: "internal server error" });
    }
}

// module.exports.getAllLectureComment=async(req,res)=>{
// try {
//    const lectureId=req.params;
//     const lecture = await Lecture.findById(lectureId).populate({
//       path:"comments",  
//     });
       
// } catch (error) {
//     console.log("getAllLectureComment", error)
//         res.status(500).json({ message: "internal server error" });
// }
// }