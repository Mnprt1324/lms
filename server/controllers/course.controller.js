const Course = require("../models/course.model");
const { deleteMediaFromCloudinary, uploadMedia } = require("../utils/cloudinary");
const User = require("../models/user.models")

//create coures
module.exports.createCourse = async (req, res) => {
    try {
        const { title, category } = req.body;
        const courseTitle = title;
        if (!courseTitle || !category) {
            return res.status(400).json({ message: "Course Title and Category is required" })
        }

        const course = new Course({
            courseTitle,
            category,
            creator: req.user,
        });
        await course.save();
        return res.status(200).json({ message: "Course create", course })
    } catch (error) {
        console.log("createCourse", error);
        res.status(500).json({ error: true, message: 'internal server error' });
    }

}

//get creater course
module.exports.getCreaterCourse = async (req, res) => {
    try {
        const userId = req.user;
        const courses = await Course.find({ creator: userId });
        if (!courses) {
            return res.status(400).json({
                course: [],
                message: "course not found"
            })
        }
        return res.status(200).json({
            courses,
            message: "course fetched"
        })



    } catch (error) {
        console.log("getCreaterCourse", error);
        res.status(500).json({ error: true, message: 'internal server error' });
    }
}

//edit course
module.exports.editCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
        const thumbnail = req.file;

        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({ message: "course not found" });
        }
        let courseThumbnail;
        if (thumbnail) {
            if (course.courseThumbnail) {
                //delete exist thumbnail
                const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
                await deleteMediaFromCloudinary(publicId);
            }
            courseThumbnail = await uploadMedia(thumbnail.path);
        }

        const updateData = { courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail: courseThumbnail?.secure_url };
        //finding course and updte
        course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

        return res.status(200).json({
            course,
            courseThumbnail,
            message: "Course updated successfully."
        })

    } catch (error) {
        console.log("editCourse", error);
        res.status(500).json({ error: true, message: 'internal server error' });
    }
}


//get single course by Id 
module.exports.getCourseById = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId).populate([
            { path: "lectures", select: "lectureTitle videoUrl isPreviewFree" },
            { path: "creator", select: "avatar name email" },

        ]);
        if (!course) {
            return res.status(404).json({ message: "course not found" });
        }
        res.status(200).json({ message: "coures found", course });
    } catch (error) {
        console.log("getCourseById", error)
        res.status(500).json({ error: true, message: 'internal server error' });
    }
}

//get public course
module.exports.getAllPublishCourse = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).populate({ path: "creator", select: "name email avatar" });
        if (!courses) {
            return res.status(404).json({ message: "Course not found" })
        }
        return res.status(200).json({ courses, message: "course fetched" })
    } catch (error) {
        console.log("getAllPublishCourse", error)
        res.status(500).json({ error: true, message: 'internal server error' });
    }
}

module.exports.filterCourse = async (req, res) => {
  try {
    const { All, sortOrder, category, searchQuery } = req.body.data;

    // Base filter
    const filter = {
      isPublished: true,
    };

    // Category filter
    if (!All && category && category.length > 0) {
      filter.category = { $in: category };
    }

    // Search filter (title or description)
    if (searchQuery && searchQuery.trim() !== "") {
      const regex = new RegExp(searchQuery.trim(), "i"); // case-insensitive regex
      filter.$or = [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
      ];
    }

    // Sorting
    const sort = {};
    if (sortOrder === "0") {
      sort.coursePrice = 1;
    } else if (sortOrder === "1") {
      sort.coursePrice = -1;
    }

    // Fetch courses
    const courses = await Course.find(filter)
      .sort(sort)
      .populate({ path: "creator", select: "name avatar" });

    res.status(200).json({ courses, message: "Filtered courses fetched" });

  } catch (error) {
    console.error("filterCourse error:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

