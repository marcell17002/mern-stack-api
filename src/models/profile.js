const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfilePost = new Schema(
  {
    pengalaman: {
      type: String,
      required: true,
    },
    jenisPengalaman: {
      type: String,
      required: true,
    },
    periode: {
      type: String,
      required: true,
    },
    jabatan: {
      type: String,
    },
    instansi: {
      type: String,
    },
    pemilik: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProfilePost", ProfilePost);
