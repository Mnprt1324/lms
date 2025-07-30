const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const { genrateToken } = require("../utils/genrateToken");
const { deleteMediaFromCloudinary, uploadMedia } = require("../utils/cloudinary");
const { registerSchema, loginSchema } = require("../validation/user.validation");


module.exports.registerUser = async (req, res) => {
    try {

        const { error, value } = registerSchema.validate(req.body, {
            abortEarly: false, // show all errors
            stripUnknown: true
        })

        if (error) {
            const errorMessages = error.details.map((d) => d.message);
            return res.status(400).json({ errors: errorMessages });
        }
        const { name, email, password } = value;
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
        const { error, value } = loginSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })
        if (error) {
            const errorMessages = error.details.map((d) => d.message);
            return res.status(400).json({ errors: errorMessages });
        }
        const { email, password } = value;
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
        res.status(200).json({ error: false, message: "logout successfully" })

    } catch (error) {
        console.log("error in logOutUser:", error);
        res.status(500).json({ error: true, message: 'internal server error' });
    }

}

module.exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(userId).populate([
            {
                path: "enrollCourses",
                model: "course",
                populate:{
                    path:"creator",
                    model:"Users"
                }
            }
        ]
        ).select("-password");
        if (!user) {
            return res.status(404).json({ message: "profile not found" });
        }
        return res.status(200).json({ user, message: "user profile fetch" })
    } catch (error) {
        console.log("error in getUserProfile", error);
        res.status(500).json({ error: true, message: 'internal server error' });
    }
}

module.exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user;
        const { name } = req.body;
        const profilePhoto = req.file;

        const user = User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "user not Found" });
        }
        if (user.avatar) {
            const publicId = user.avatar.split("/").pop().split(".")[0];
            deleteMediaFromCloudinary(publicId);
        }

        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;
        const updateData = {
            name,
            avatar: photoUrl,
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-Password");

        return res.status(200).json({
            error: false,
            user: updatedUser,
            message: "Profile updated successfully."
        })

    } catch (error) {
        console.log("updateUsereProfile", error);
        res.status(500).json({ error: true, message: 'internal server error' });
    }
}