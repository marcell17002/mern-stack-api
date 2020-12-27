const Agenda = require("../models/agenda");
const { validationResult } = require("express-validator");

exports.creteAgenda = (req, res, next) => {
  const title = req.body.title;
  const place = req.body.place;
  const date = req.body.date;
  const idUser = req.body.idUser;

  const Send = new Agenda({
    title: title,
    place: place,
    date: date,
    idUser: idUser,
  });

  Send.save()
    .then((result) => {
      res.status(201).json({ message: "Create agenda Success", data: result });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

exports.getAllAgenda = (req, res, next) => {
  Agenda.find()
    .then((result) => {
      res.status(200).json({
        message: "Render data success",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.getAgendaById = (req, res, next) => {
  const idEvent = req.params.idEvent;
  Agenda.findById(idEvent)
    .then((result) => {
      if (!result) {
        const error = new Error("Agenda post doesnt found!");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "Agenda post by id founded",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.getSpecificAgendaById = (req, res, next) => {
  const idUser = req.params.idUser;

  Agenda.find({ idUser: idUser })
    .then((result) => {
      res.status(200).json({
        message: "Render data user success",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.updateAgenda = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const title = req.body.title;
  const place = req.body.place;
  const date = req.body.date;
  const idUser = req.body.idUser;
  const idEvent = req.params.idEvent;

  Agenda.findById(idEvent)
    .then((post) => {
      if (!post) {
        const err = new Error("Data not found");
        error.errorStatus = 404;
        throw err;
      }
      post.title = title;
      post.place = place;
      post.date = date;
      post.idUser = idUser;

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

exports.deleteAgenda = (req, res, next) => {
  const idEvent = req.params.idEvent;

  Agenda.findById(idEvent)
    .then((post) => {
      if (!post) {
        const error = new Error("Data not found!");
        error.errorStatus = 404;
        throw error;
      }
      return Agenda.findByIdAndRemove(idEvent);
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
