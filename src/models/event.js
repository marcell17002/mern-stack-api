const monggose = require("mongoose");
const Schema = monggose.Schema;

const EventPost = new Schema(
  {
    tittle: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = monggose.model("EventPost", EventPost);
