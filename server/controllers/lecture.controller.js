const { model } = require("mongoose");
const Course = require("../models/course.model");
const Lecture = require("../models/lecture.model");
const { deleteVideoFromCloudinary } = require("../utils/cloudinary");


//creating a lecture
module.exports.createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body;
        const { courseId } = req.params;

        if (!lectureTitle || !courseId) {
            return res.status(400).json({
                message: "Lecture title is required"
            })
        };
        //creating new lecture
        const lecture = new Lecture({ lectureTitle });
        await lecture.save();
        const course = await Course.findById(courseId);
        if (course) {
            course.lectures.push(lecture._id);
            await course.save();
        }
        return res.status(201).json({
            lecture,
            message: "Lecture created successfully."
        });

    } catch (error) {
        console.log("createLecture", error)
        res.status(500).json({ message: "internal server error" });
    }
}

//getting a all letcture of specified course
module.exports.getCourseLecture = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById({ _id:courseId }).populate("lectures")
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            })
        }
        return res.status(200).json({ lectures: course.lectures });
    } catch (error) {
        console.log("getCourseLecture", error)
        res.status(500).json({ message: "internal server error" });
    }

}

// get lecture by id
module.exports.getLectureById = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found!" });
        }

        return res.status(200).json({ lecture, message: "lecture fetched" });
    } catch (error) {
        console.log("getLectureById", error)
        res.status(500).json({ message: "internal server error" });
    }
}


//for toggel publish field
module.exports.togglePublishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { publish } = req.query;
        const course = await Course.findById({_id:courseId })
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }
        //updating field 
        course.isPublished = publish === "true";
        await course.save();

        //for sending response
        const statusMessage = course.isPublished ? "Published" : "Unpublished";
        return res.status(200).json({
            message: `Course is ${statusMessage}`
        });

    } catch (error) {
        console.log("togglePublishCourse", error)
        res.status(500).json({ message: "internal server error" });
    }
}


//edit lecture
module.exports.editLecture = async (req, res) => {
    try {
        //validate req.body
        const { lectureTitle ,lectureVideo, isPreviewFree } = req.body;
        const { courseId, lectureId } = req.params;
        const videoInfo=lectureVideo;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({ message: "lecture not found" })
        }
          if (lecture.publicId) {
            await deleteVideoFromCloudinary(lecture.publicId);
        }
        
        if (lectureTitle) lecture.lectureTitle = lectureTitle;
        if (videoInfo?.secure_url) lecture.videoUrl = videoInfo.secure_url;
        if (videoInfo?.public_id) lecture.publicId = videoInfo. public_id;
        lecture.isPreviewFree = isPreviewFree;
        await lecture.save();

        const course = await Course.findById(courseId);
        // if not present 
    
        if (course && !course.lectures.includes(lectureId)) {
            course.lectures.push(lecture._id);
            await course.save();
        }
        return res.status(200).json({
            lecture, message: "Lecture updated successfully."
        })
    } catch (error) {
        console.log("editLecture", error)
        res.status(500).json({ message: "internal server error" });
    }
}

module.exports.removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found!" });
        }

        if (lecture.publicId) {
            await deleteVideoFromCloudinary(lecture.publicId);
        }

        await Course.updateOne({ lectures: lectureId }, // find the course that contains the lecture
            { $pull: { lectures: lectureId } } // Remove the lectures id from the lectures array
        );
        return res.status(200).json({ message: "Lecture removed successfully." })

    } catch (error) {
        console.log("removeLecture", error)
        res.status(500).json({ message: "internal server error" });
    }
}