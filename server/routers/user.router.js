const express=require('express');
const router=express.Router();
const userController=require('../controllers/user.controllers');
const { isAuthenticate } = require('../middlewares/Authenticate');


router.post("/register",userController.registerUser);
router.post("/login",userController.loginUser);
router.post("/logout",userController.logOutUser);
router.get("/getprofile",isAuthenticate,userController.getUserProfile);


module.exports=router