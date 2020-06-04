const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.user_register = async (req, res, next) => {
  const userEmail = await User.find({ email: req.body.email });
  if (userEmail.length < 1) {
    const hash = await bcrypt.hash(req.body.password, 5);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hash,
      type: req.body.type
    });
    await user
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "User Created...",
          userDetails: result
        });
      })
      .catch(err => {
        console.log(err.message);
        res.status(500).json({
          error: err.message
        });
      });
  } else {
    console.log("Email already exist.");
    res.status(409).json({
      message: "Email already exist."
    });
  }
};

module.exports.user_login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    console.log("Email does not exist...");
    res.status(404).json({
      message: "Email not found..."
    });
  } else {
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      console.log("Auth Failed...");
      res.status(401).json({
        message: "Password is incorrect..."
      });
    } else {
      const token = jwt.sign(
        { email: user.email, _id: user._id, type: user.type },
        process.env.JWT_KEY,
        {
          expiresIn: "1h"
        }
      );
      res.status(200).json({
        email: user.email,
        password: user.password,
        token: token
      });
    }
  }
};

module.exports.user_delete = async (req, res, next) => {
  User.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted..."
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

module.exports.user_all = async (req, res, next) => {
  const user = await User.find();
  res.status(201).json({
    users: user
  });
};
