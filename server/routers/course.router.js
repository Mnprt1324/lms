const express=require("express");
const router=express.Router();

const couresControllers=require("../controllers/course.controller");
const lectureControllers=require("../controllers/lecture.controller")
const coursePayControllers=require("../controllers/coursePayment.controller")
const { isAuthenticate } = require("../middlewares/Authenticate");
const upload = require("../utils/multer");

// post routes
router.post("/",isAuthenticate,couresControllers.createCourse);
router.get("/getAllCourse",isAuthenticate,couresControllers.getCreaterCourse);
router.post("/:courseId",isAuthenticate,upload.single("courseThumbnail"),couresControllers.editCourse);
router.post("/course-filter/a",couresControllers.filterCourse);
//get routes
router.get("/published-courses",couresControllers.getAllPublishCourse)
router.get("/:courseId",isAuthenticate,couresControllers.getCourseById);
// lecture routes
router.post("/lecture/:courseId",isAuthenticate,lectureControllers.createLecture);
router.post("/:courseId/lecture/:lectureId",isAuthenticate,lectureControllers.editLecture);
router.get("/lecture/:lectureId",isAuthenticate,lectureControllers.getLectureById);
router.get("/:courseId/lecture",isAuthenticate,lectureControllers.getCourseLecture);
router.delete("/lecture/:lectureId",isAuthenticate,lectureControllers.removeLecture);
router.put("/:courseId",isAuthenticate,lectureControllers.togglePublishCourse);

router.post("/payment/create-order",isAuthenticate,coursePayControllers.createOrder);
router.post("/:courseId/payment/verify",isAuthenticate,coursePayControllers.verifyPayment);
router.put("/payment/update",isAuthenticate,coursePayControllers.updatePurchaseCourse)
router.get("/purchased/aa",isAuthenticate,coursePayControllers.getAllPurchasedCourse);


module.exports=router;