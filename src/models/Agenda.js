const monggose = require("mongoose");
const Schema = monggose.Schema;

const Agenda = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    place: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    idUser: {
      type: String,
      required: true,
    },
    containt: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = monggose.model("Agenda", Agenda);
