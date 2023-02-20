const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticator = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.secretKey, async (err, decoded) => {
      if (decoded) {
        req.body.userid = decoded.userid;
        next();
      } else {
        res.send({ msg: "You are not Logged in" });
      }
    });
  } catch (error) {
    res.send({ msg: "Server Error", Error: error.message });
  }
};

module.exports = { authenticator };
