const jwt = require("jsonwebtoken");


module.exports.isAuthenticate = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: true, message: "unauthorized access" })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token" });
      }
      req.user = decode.id;
      next();

    });

  } catch (error) {
    console.log("error in isAuthenticate", error);
    res.status(500).json({ error: true, message: 'internal server error' });
  }
}