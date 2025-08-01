const express = require("express");
const router = express.Router();
const commnetController = require("../controllers/comment.controller");
const { isAuthenticate } = require("../middlewares/Authenticate");

router.post("/:lectureId/create", isAuthenticate, commnetController.createCommnet);

module.exports = router;