const express=require("express");
const router=express.Router();

const couresControllers=require("../controllers/course.controller");
const lectureControllers=require("../controllers/lecture.controller")

const { isAuthenticate } = require("../middlewares/Authenticate");
const upload = require("../utils/multer");

// post routes
router.post("/",isAuthenticate,couresControllers.createCourse);
router.get("/getAllCourse",isAuthenticate,couresControllers.getCreaterCourse);
router.post("/:courseId",isAuthenticate,upload.single("courseThumbnail"),couresControllers.editCourse);
//get routes
router.get("/:courseId",isAuthenticate,couresControllers.getCourseById);

// lecture routes
router.post("lecture/:courseId",isAuthenticate,lectureControllers.createLecture);
router.post("/:courseId/lecture/:courseId",isAuthenticate,lectureControllers.editLecture);
router.get("lecture/:lectureId",isAuthenticate,lectureControllers.getLectureById);
router.get("/:courseId/lecture",isAuthenticate,lectureControllers.getCourseLecture);
router.delete("lecture/:lectureId",isAuthenticate,lectureControllers.removeLecture);
router.post("/:courseId",isAuthenticate,lectureControllers.togglePublishCourse);




module.exports=router;