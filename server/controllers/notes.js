const Note = require("../models/notes");

exports.getAllNotes = async (req, res) => {
  try {
    const result = await Note.find();
    if (result && result.length !== 0) {
      return res.status(200).send({
        msg: "Notes found!",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Notes not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const result = await Note.findById(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Note found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Note not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const result = await Note.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Note deleted",
      });
    }
    res.status(500).send({ msg: "Something went wrong" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateNote = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      date: req.body.date,
      type: req.body.type,
      text: req.body.text,
    };
    const result = await Note.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        msg: "Note updated",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Note was not updated",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createNote = async (req, res) => {
  try {
    const data = new Note({
      name: req.body.name,
      date: req.body.date,
      type: req.body.type,
      text: req.body.text,
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        msg: "Note created",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Note was not created",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
