const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notes");

router.get("/", notesController.getAllNotes);


router.get("/:id", notesController.getNoteById);

router.delete("/:id", notesController.deleteNote);

router.put("/:id", notesController.updateNote);

router.post("/", notesController.createNote);

module.exports = router;
