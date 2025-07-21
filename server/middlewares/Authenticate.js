const jwt = require("jsonwebtoken");


module.exports.isAuthenticate = (req, res,next) => {
    try {
      const token=req.cookies.token;
      if(!token){
        res.status(401).json({error:true,message:"UnAuthentucate user"})
      }

      const decode=jwt.verify(token,process.env,JWT_SECRET);
     if(!decode){
         res.status(401).json({error:true,message:"invalid token"})
     }
     req.user=decode.id;
     next();
    } catch (error) {
        console.log("error in isAuthenticate", error);
        res.status(500).json({ error: true, message: 'internal server error' });
    }
}