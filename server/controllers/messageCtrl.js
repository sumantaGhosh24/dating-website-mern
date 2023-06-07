const Message = require("../models/messageModel");

const messageCtrl = {
  getMessage: async (req, res) => {
    try {
      const {userId, correspondingUserId} = req.query;
      const query = {
        from_userId: userId,
        to_userId: correspondingUserId,
      };
      const foundMessages = await Message.find(query);
      return res.send(foundMessages);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  addMessage: async (req, res) => {
    try {
      const message = req.body.message;
      const newMessage = new Message(message);
      await newMessage.save();
      return res.send(newMessage);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
};

module.exports = messageCtrl;
