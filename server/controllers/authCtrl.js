const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const authCtrl = {
  signup: async (req, res) => {
    try {
      const {email, password} = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await User.findOne({email});
      if (existingUser) {
        return res
          .status(400)
          .send("This email already register, try another one.");
      }
      const sanitizedEmail = email.toLowerCase();
      const newUser = new User({
        email: sanitizedEmail,
        password: hashedPassword,
      });
      await newUser.save();
      const token = jwt.sign(newUser, sanitizedEmail, {expiresIn: 60 * 24});
      return res.status(201).send({token, userId: newUser._id});
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  login: async (req, res) => {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({email});
      const correctPassword = await bcrypt.compare(password, user.password);
      if (user && correctPassword) {
        const token = jwt.sign(user, email, {expiresIn: 60 * 24});
        return res.status(201).send({token, userId: user._id});
      }
      return res.status(400).send("Invalid Credentials.");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
};

module.exports = authCtrl;
