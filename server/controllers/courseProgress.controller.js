const Course = require("../models/course.model");
const CourseProgress = require("../models/courseProgress");


module.exports.getCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user;
        //fetching courseProgress and course details
         courseProgress = await CourseProgress.findOne({ courseId, userId }).populate("courseId")
        const courseDetails = await Course.findById(courseId).populate([
            {
                path: "creator",
                model: "Users"
            },
            {
                path: "lectures",
                model: "Lecture",
                populate: {
                    path: "comments",
                    model: "Comment",
                    populate: {
                        path: "userId", // Optional: to get user details
                        model: "Users",
                        select: "name avatar",
                    },
                },
            }
        ]);

        if (!courseDetails) {
            return res.status(404).json({ message: "Course Not Found" });
        }
        if (!courseProgress) {
            return res.status(200).json({
                data: {
                    courseDetails,
                    progress: [],
                    completed: false,
                }
            })
        }

        return res.status(200).json({
            data: {
                courseDetails,
                progress: courseProgress.lectureProgress,
                completed: courseProgress.completed,
            }

        }
        )

    } catch (error) {
        console.log("getCourseProgress", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports.updateLectureProgress = async (req, res) => {
    try {
        const { courseId, lectureId } = req.params;
        const userId = req.user;
        //fetching the courseProgress 
        let courseProgress = await CourseProgress.findOne({ courseId, userId });
        if (!courseProgress) {
            //if no courseProgress find then creating a new progress
            courseProgress = new CourseProgress({
                courseId, userId, completed: false, lectureProgress: []
            })
        }
        //if courseProgress is available then finding lecture index from 
        const lectureIndex = courseProgress.lectureProgress.findIndex((lecture) => {
            return lecture.lectureId === lectureId;
        })

        if (lectureIndex !== -1) {
            //lectureIndex is non empty the update the viewed field
            courseProgress.lectureProgress[lectureIndex].viewed = true;
        } else {
            //add new lecture Progress
            courseProgress.lectureProgress.push({
                lectureId, viewed: true
            })
        }

        const lectureProgressLenght = courseProgress.lectureProgress.filter((lectureProg) => lectureProg.viewed).length;
        const course = await Course.findById(courseId);
        if (course.lectures.length === lectureProgressLenght) {
            courseProgress.completed = true;
        }
        await courseProgress.save();
        return res.status(200).json({ message: "lecture progress Update Scussfully" })
    } catch (error) {

        console.log("updateLectureProgress", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }

}

module.exports.markAsIsComplete = async (req, res) => {
    try {
        const { courseId } = req.params;
        const {isComplete}=req.body
        const userId = req.user;
        const courseProgress = await CourseProgress.findOne({ courseId,userId });
        if (!courseProgress) return res.status(404).json({ message: "course Progress not found" });

        courseProgress.lectureProgress.map((lectureProgress) => lectureProgress.viewed = isComplete);
        courseProgress.completed = isComplete;
        await courseProgress.save();
         const message=isComplete?"course marked completed":"course marked Incompleted";

        return res.status(200).json({ message });
    } catch (error) {
        console.log("markAsComplete", error)
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

// module.exports.markAsInComplete = async (req, res) => {
//     try {
//         const { courseId } = req.params;
//         const userId = req.user;
//         const courseProgress = await CourseProgress.findOne({ courseId, userId });
//         if (!courseProgress) return res.status(404).json({ message: "course Progress not found" });

//         courseProgress.lectureProgress.map((lectureProgress) => lectureProgress.viewed = false);
//         courseProgress.completed = false;
//         await courseProgress.save();
//         return res.status(200).json({ message: "course marked Incompleted" });
//     } catch (error) {
//         console.log("markAsComplete", error)
//         return res.status(500).json({ message: "Internal Server Error" })

//     }
// }