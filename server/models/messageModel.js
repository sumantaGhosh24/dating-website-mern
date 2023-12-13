const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    from_userId: {
      type: String,
      required: true,
    },
    to_userId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
