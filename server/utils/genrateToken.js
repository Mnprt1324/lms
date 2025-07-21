const  jwt=require("jsonwebtoken");

module.exports.genrateToken=(user)=>{
try {
     const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
     return token
} catch (error) {
    console.log(error);
}
}