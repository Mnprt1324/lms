const express=require("express");
const { isAuthenticate } = require("../middlewares/Authenticate");
const courseProgressControl=require("../controllers/courseProgress.controller")
const router=express.Router();

router.get("/:courseId",isAuthenticate,courseProgressControl.getCourseProgress)
router.post("/:courseId/lecture/:lectureId",isAuthenticate,courseProgressControl.updateLectureProgress)
router.post("/:courseId/iscomplete",isAuthenticate,courseProgressControl.markAsIsComplete)
// router.post("/:courseId/incomplete",isAuthenticate,courseProgressControl.markAsComplete)

module.exports=router;