const mongoose=require("mongoose");

const connectToDB=async()=>{
 try {
     await mongoose.connect(process.env.MONGO_URI);
     console.log("mongodb Connected scussfully")
 } catch (error) {
    console.log(error)
 }
}

module.exports=connectToDB;