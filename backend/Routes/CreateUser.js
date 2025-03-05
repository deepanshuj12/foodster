const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post(
  "/createuser",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt= await bcrypt.genSalt(10)
    const strongPassword= await bcrypt.hash(req.body.password, salt);
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already in use" });
      }
      const newUser= await User.create({
        name: req.body.name,
        password: strongPassword,
        email: req.body.email,
        location: req.body.location
      });
      const data = {
        user: {
          id: newUser.id,
        },
      };
      const authToken=jwt.sign(data,process.env.SECRET)
      return res.json({ success: true, authToken:authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
