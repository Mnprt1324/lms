const express=require('express');
const router=express.Router();
const userController=require('../controllers/user.controllers');
const { isAuthenticate } = require('../middlewares/Authenticate');
const upload = require('../utils/multer');


router.post("/register",userController.registerUser);
router.post("/login",userController.loginUser);
router.post("/logout",userController.logOutUser);
router.get("/getprofile",isAuthenticate,userController.getUserProfile);
router.post("/update/profile",isAuthenticate,upload.single("profilePhoto"),userController.updateUserProfile)

module.exports=router