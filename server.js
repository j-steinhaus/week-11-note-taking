// consts throughtout
const express = require("express");
const fs = require("fs");
const path = require("path");

// creating the express app
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get routes being created to send usert to index page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "assets/index.html"));
});

// GET route using DB.JSON file
app.get("/assets/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "db.json"));
});

// GET route sending user to NOTES page
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "assets/notes.html"));
});

// Creating POST route- takes JSON input, "title" "text" and adds a new note object to the db.json file
app.post("/assets/notes", function (req, res) {
  fs.readFile(
    path.join(__dirname, "db.json"),
    "utf8",
    function (error, response) {
      if (error) {
        console.log(error);
      }
      const notes = JSON.parse(response);
      const noteRequest = req.body;
      const newNoteID = notes.length + 1;
      const newNote = {
        id: newNoteID,
        title: noteRequest.title,
        text: noteRequest.text,
      };
      notes.push(newNote);
      res.json(newNote);
      fs.writeFile(
        path.join(__dirname, "db.json"),
        JSON.stringify(notes, null, 2),
        function (err) {
          if (err) throw err;
        }
      );
    }
  );
});

// Creates DELETE function- deleting the note object with the id from the DB.JSON FILE
app.delete("/assets/notes/:id", function (req, res) {
  const deleteID = req.params.id;
  fs.readFile("db.json", "utf8", function (error, response) {
    if (error) {
      console.log(error);
    }
    let notes = JSON.parse(response);
    if (deleteID <= notes.length) {
      res.json(notes.splice(deleteID - 1, 1));
      for (let i = 0; i < notes.length; i++) {
        notes[i].id = i + 1;
      }
      fs.writeFile("db.json", JSON.stringify(notes, null, 2), function (err) {
        if (err) throw err;
      });
    } else {
      res.json(false);
    }
  });
});

app.listen(PORT, function () {
  console.log(`App is listening on Port ${PORT}`);
});
