const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = new Schema(
  {
    chatID: {
      type: String,
      required: true,
    },
    allChat: {
      dateChat: String,
      chatText: {
        sendBy: String,
        chatTime: String,
        chatContent: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", Message);
