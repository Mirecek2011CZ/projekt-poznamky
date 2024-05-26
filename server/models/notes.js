const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Number, required: true },
  text: { type: String, required: true },
});

module.exports = mongoose.model("Note", schema);