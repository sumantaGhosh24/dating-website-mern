const User = require("../models/userModel");

const userCtrl = {
  individualUser: async (req, res) => {
    try {
      const userId = req.query.userId;
      const query = {_id: userId};
      const user = await User.findOne(query);
      return res.send(user);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  addMatch: async (req, res) => {
    try {
      const {userId, matchedUserId} = req.body;
      const query = {_id: userId};
      const updateDocument = {
        $push: {matches: {_id: matchedUserId}},
      };
      const user = await User.updateOne(query, updateDocument);
      return res.send(user);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const userIds = JSON.parse(req.query.userIds);
      const pipeline = [
        {
          $match: {
            _id: {
              $in: userIds,
            },
          },
        },
      ];
      const foundUsers = await User.aggregate(pipeline).toArray();
      return res.json(foundUsers);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  getGenderedUsers: async (req, res) => {
    try {
      const gender = req.query.gender;
      const query = {gender_identity: {$eq: gender}};
      const foundUsers = await User.find(query).toArray();
      return res.json(foundUsers);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  updateUser: async (req, res) => {
    try {
      const formData = req.body.formData;
      const query = {_id: formData.user_id};
      const updateDocument = {
        $set: {
          first_name: formData.first_name,
          dob_day: formData.dob_day,
          dob_month: formData.dob_month,
          dob_year: formData.dob_year,
          show_gender: formData.show_gender,
          gender_identity: formData.gender_identity,
          gender_interest: formData.gender_interest,
          url: formData.url,
          about: formData.about,
          matches: formData.matches,
        },
      };
      const insertedUser = await User.updateOne(query, updateDocument);
      return res.json(insertedUser);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
};

module.exports = userCtrl;
