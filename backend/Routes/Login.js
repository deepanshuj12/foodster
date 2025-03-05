require('dotenv').config();
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    try {
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let email = req.body.email;
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Wrong credentials or doesn't exist" });
      }
      const comparePassword= bcrypt.compare(req.body.password, userData.password)
      if (!comparePassword) {
        return res
          .status(400)
          .json({ errors: "Wrong credentials or doesn't exist" });
      }
    
      const data= {
        user:{
          id: userData.id
        }
      }

      const authToken=jwt.sign(data,process.env.SECRET)
      return res.json({ success: true, authToken:authToken });
    } catch (error) {
      console.error("Error during login:", error); 
      return res
        .status(500)
        .json({ errors: "Server error", message: error.message });
    }
  }
);

module.exports = router;
