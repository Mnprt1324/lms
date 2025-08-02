const express = require("express");
const router = express.Router();
const feedBackController = require("../controllers/feedback.controller");
const { isAuthenticate } = require("../middlewares/Authenticate");

router.post("/", isAuthenticate, feedBackController.createFeedback);
router.get("/", feedBackController.getAllFeedback);
module.exports = router;