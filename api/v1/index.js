const express = require("express"); //Importing Express
const notesRouter = express.Router(); //Express Router
const mongoose = require("mongoose");
const Note = require("../../db/note.model");
// For this Router File (See Below)
// {  ("/") ====> ("http://localhost:5000/notes")  }

// /notes Route
// Get all notes
// http://localhost:5000/notes a get request being handled on this route
notesRouter.get("/", (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) {
      console.error(err);
    }
    res.json({
      notes,
      // success: true,
    });
  });
});
// Add a new note
// http://localhost:5000/notes a Post request is being handled on this route
notesRouter.post("/", (req, res) => {
  console.log(req.body);
  const newNote = new Note(req.body);
  newNote.save().then((savedNote) => {
    res.json({
      note: savedNote,
      success: true,
    });
  });
});
// Get a note by id
// http://localhost:5000/notes/:id
notesRouter.get("/:id", (req, res) => {
  const noteId = req.params.id;
  Note.findById(noteId, (err, note) => {
    if (err) {
      console.error(err);
    }
    if (!note) {
      return res.status(404).json({
        message: "note not found",
      });
    }
    res.json({
      //https://my200-notes-backend.herokuapp.com/notes
      note,
      reply: "Get note by id success",
    });
  });
});
// Delete a note by id
// http://localhost:5000/notes/:id
notesRouter.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  Note.findByIdAndRemove(noteId, (err, deletedNote) => {
    console.log(err, deletedNote);
    if (err) {
      console.error(err);
    }
    if (!deletedNote) {
      return res.status(404).json({
        message: "note not found for deletion",
      });
    }
    res.json({
      deletedNote,
      reply: "delete note by id success",
    });
  });
});

// const notes = [
//   {
//     text: "Watch Ahsan's Stream.",
//     link: "http://twitch.tv/codewithahsan",
//   },
//   {
//     text: "Do Groceries.",
//     link: "https://foodpanda.pk",
//   },
// ];
// res.json({
//   notes,
// });

// Update Note by Id
notesRouter.put("/:id", (req, res) => {
  const noteId = req.params.id;
  const updatedBody = req.body;
  Note.findOneAndUpdate(
    noteId,
    updatedBody,
    {
      new: true,
    },
    (err, updatedNote) => {
      if (err) {
        console.error(err);
      }
      if (!updatedNote) {
        return res.status(404).json({
          message: "note not found for updating",
        });
      }
      res.json({
        note: updatedNote,
        reply: "Update note by id success",
      });
    }
  );
});

notesRouter.get("/dummy", (req, res) => {
  res.json({ text: "dummy" });
});

module.exports = {
  notesRouter,
};
