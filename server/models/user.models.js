const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'],
        default: 'student',
    },
    enrollCourses:[{
     type:mongoose.Schema.Types.ObjectId,
     ref:'Course'
    }],

    bio: String,
    avatar:{
        type:String,
        default:""
    },
}, { timestamps: true })

const user=mongoose.model("Users",userSchema);
module.exports=user;