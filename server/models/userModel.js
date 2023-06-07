const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
    },
    dob_day: {
      type: String,
    },
    dob_month: {
      type: String,
    },
    dob_year: {
      type: String,
    },
    gender_identity: {
      type: String,
    },
    show_gender: {
      type: String,
    },
    gender_interest: {
      type: String,
    },
    url: {
      type: String,
    },
    about: {
      type: String,
    },
  },
  {timestamps: true}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
