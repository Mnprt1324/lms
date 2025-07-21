const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const { genrateToken } = require("../utils/genrateToken");


module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email })
        console.log(user);
        if (user) {
            return res.status(404).json({ error: true, message: "User already exists" })
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashpassword });
        await newUser.save();
        res.status(200).json({ error: false, message: "new user register", newUser });
    } catch (error) {
        console.log("error in register user:", error);
        res.status(500).json({ error: true, message: "internal server error" });
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "invalid user or passoword" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ error: false, message: "invalid user or passoword" })
        }
        const token = await genrateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 days
        });

        res.status(200).json({ error: false, message: "user login scussfully", token, user });
    } catch (error) {
        console.log("error in loginUser:", error);
        res.status(500).json({ error: true, message: 'internal server error' });
    }
}

module.exports.logOutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({error:false,message:"logout successfully"})

    } catch (error) {
        console.log("error in logOutUser:", error);
        res.status(500).json({ error: true, message: 'internal server error' });
    }

}

module.exports.getUserProfile=async(req,res)=>{
 try {
    const userId=req.user;
     const user = await User.findById(userId).select("-password");
      console.log(user)
       if (!user) {
            return res.status(404).json({ message: "profile not found" });
        }  
    return res.status(200).json({user,message:"user profile fetch"})
 } catch (error) {
   c
 }
}