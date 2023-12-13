const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require("uuid");

const User = require("../models/userModel");

const authCtrl = {
  signup: async (req, res) => {
    try {
      const {email, password} = req.body;
      const generatedUserId = uuidv4();
      const hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await User.findOne({email});
      if (existingUser) {
        return res
          .status(400)
          .json({message: "This email already register, try another one."});
      }
      const sanitizedEmail = email.toLowerCase();
      const newUser = new User({
        user_id: generatedUserId,
        email: sanitizedEmail,
        password: hashedPassword,
      });
      await newUser.save();
      const token = jwt.sign(newUser.toJSON(), sanitizedEmail, {
        expiresIn: 60 * 24,
      });
      return res.status(201).json({token, userId: generatedUserId});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  login: async (req, res) => {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({email});
      const correctPassword = await bcrypt.compare(password, user.password);
      if (user && correctPassword) {
        const token = jwt.sign(user.toJSON(), email, {expiresIn: 60 * 24});
        return res.status(201).json({token, userId: user.user_id});
      }
      return res.status(400).json({message: "Invalid Credentials."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

module.exports = authCtrl;
