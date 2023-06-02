const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    from_userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    to_userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
