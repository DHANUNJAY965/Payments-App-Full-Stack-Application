const secreat = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const { User } = require("../Models/User");

const UserAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(403)
      .json({ message: "Sorry your not signed in please login first" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secreat);
    if (decoded) {
      req.userid = decoded.userid;
      next();
    }
  } catch (err) {
    return res
      .status(403)
      .json({ message: "error occured while authenticating im middleware" });
  }
};







module.exports = {
  UserAuth
};
