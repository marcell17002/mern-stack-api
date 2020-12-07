const { validationResult } = require("express-validator");
const ProfilePost = require("../models/profile");
const path = require("path");
const fs = require("fs");
const { profile } = require("console");

exports.createProfile = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Invalid Value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }
  const pengalaman = req.body.pengalaman;
  const jenisPengalaman = req.body.jenisPengalaman;
  const jabatan = req.body.jabatan;
  const periode = req.body.periode;
  const pemilik = req.body.pemilik;
  const instansi = req.body.instansi;

  const AddingProfile = new ProfilePost({
    pengalaman: pengalaman,
    jenisPengalaman: jenisPengalaman,
    jabatan: jabatan,
    periode: periode,
    pemilik: pemilik,
    instansi: instansi,
  });

  AddingProfile.save()
    .then((result) => {
      res.status(201).json({ message: "Adding Profile Success", data: result });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

exports.getAllDataProfile = (req, res, next) => {
  ProfilePost.find()
    .then((result) => {
      res.status(200).json({
        message: "Render data user success",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.getSpecificDataProfile = (req, res, next) => {
  const idPemilik = req.params.idPemilik;

  ProfilePost.find({ pemilik: { id: idPemilik } })
    .then((result) => {
      res.status(200).json({
        message: "Render data user success",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.getDataProfileById = (req, res, next) => {
  const profileId = req.params.profileId;

  ProfilePost.findById(profileId)
    .then((result) => {
      if (!result) {
        const error = new Error("Data doesnt found!");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "Data has been founded",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.updateProfile = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const pengalaman = req.body.pengalaman;
  const jenisPengalaman = req.body.jenisPengalaman;
  const jabatan = req.body.jabatan;
  const periode = req.body.periode;
  const pemilik = req.body.pemilik;
  const profileId = req.params.profileId;

  ProfilePost.findById(profileId)
    .then((post) => {
      if (!post) {
        const err = new Error("Data not found");
        error.errorStatus = 404;
        throw err;
      }
      post.pengalaman = pengalaman;
      post.jenisPengalaman = jenisPengalaman;
      post.jabatan = jabatan;
      post.periode = periode;
      post.pemilik = pemilik;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Data has been updated!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteProfile = (req, res, next) => {
  const profileId = req.params.profileId;

  ProfilePost.findById(profileId)
    .then((post) => {
      if (!post) {
        const error = new Error("Data not found!");
        error.errorStatus = 404;
        throw error;
      }
      return ProfilePost.findByIdAndRemove(profileId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Data has been deleted!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
