const mongoose=require("mongoose");

const courseSchema=mongoose.Schema({
  courseTitle:{
    type:String,
    required:true
  },
  subTitle:String,
  description:{ type:String},
  category:{
    type:String,
    require:true
  },
   courseLevel:{
        type:String,
        enum:["Beginner", "Medium", "Advance"]
    },
     coursePrice:{
        type:Number
    },
      courseThumbnail:{
        type:String
    },
     enrolledStudents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    lectures:[
        {
         type:mongoose.Schema.Types.ObjectId,
         ref:"Lecture"   
        }
    ],
    creator:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"  
    },
        isPublished:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

const Course=mongoose.model("course",courseSchema);

module.exports=Course;