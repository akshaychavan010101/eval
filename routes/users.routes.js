const express = require("express");
const { UserModel } = require("../model/user.model");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

UserRouter.use(express.json());

UserRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city } = req.body;
  try {
    const user = await UserModel.find({ email: email });
    if (user.length > 0) {
      return res.send({ msg: "User already exist, please login" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send({ msg: "Something went wrong", Error: err.message });
        } else {
          const new_user = new UserModel({
            name,
            email,
            gender,
            password: hash,
            age,
            city,
          });
          await new_user.save();
          res.send({ msg: "User Registered Successfully" });
        }
      });
    }
  } catch (error) {
    res.send({ msg: "Server Error", Error: error.message });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.find({ email: email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userid: user[0]._id },
            process.env.secretKey
          );
          res.send({ msg: "Login Successfull", token: token ,user: email, id:user[0]._id});
        } else {
          res.send({ msg: "Invalid Credentials" });
        }
      });
    }
  } catch (error) {
    res.send({ msg: "Server Error", Error: error.message });
  }
});

module.exports = { UserRouter };
