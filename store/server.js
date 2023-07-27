// Express server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

const port = 12901;

const filePath = __dirname + "/notes.json";
const fs = require("fs");
function writeJSONToFile(jsonData) {
  const jsonString = JSON.stringify(jsonData, null, 2);

  fs.writeFile(filePath, jsonString, (err) => {
    if (err) {
      console.error("Error writing JSON to file:", err);
    } else {
      console.log("JSON data has been written to the file successfully.");
    }
  });
}

// Function to read JSON data from a file
function readJSONFromFile(callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON from file:", err);
      callback(err, null);
    } else {
      try {
        const parsedData = JSON.parse(data);
        callback(null, parsedData);
      } catch (err) {
        console.error("Error parsing JSON:", err);
        callback(err, null);
      }
    }
  });
}

app.get("/notes/:page", (req, res) => {
  const page = req.params.page;
  readJSONFromFile((err, data) => {
    if (err) {
      res.json([]);
    } else {
      data.days = data.days.slice((page - 1) * 3, page * 3);
      console.log(data);
      res.json(data.days);
    }
  });
});

app.get("/notes/date/:date", (req, res) => {
  const date = req.params.date.replace(/-/g, "/");
  readJSONFromFile((err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to read notes from file." });
    } else {
      const currentDay = data.days.filter((day) => day.date === date)[0];
      if (!currentDay) {
        res.status(404).json({ error: "No notes found for that date." });
      } else {
        res.json(currentDay);
      }
    }
  });
});

app.post("/notes", (req, res) => {
  const newNote = req.body;
  readJSONFromFile((err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to read notes from file." });
    } else {
      const currentDay = data.days.filter(
        (day) => day.date === newNote.date
      )[0];
      if (!currentDay) {
        data.days.push(newNote);
      } else {
        data.days.forEach((day) => {
          if (day.date === newNote.date) {
            day.checks = newNote.checks;
            day.html = newNote.html;
          }
        });
      }
      writeJSONToFile(data);
      res.json(data);
    }
  });
});

app.get("/password", (req, res) => {
  readJSONFromFile((err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to read notes from file." });
    } else {
      res.json(data.password);
    }
  });
});

app.get("/checks/:name", (req, res) => {
  const name = req.params.name;
  readJSONFromFile((err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to read notes from file." });
    } else {
      const checks = [];
      let type = "";
      data.days.forEach((day) => {
        day.checks.forEach((check) => {
          if (check.name === name) {
            checks.push({ name: day.date, value: check.value });
            type = check.type;
            return;
          }
        });
      });
      res.json({ checks: checks, type: type });
    }
  });
});

app.get("/lastchecks", (req, res) => {
  readJSONFromFile((err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to read notes from file." });
    } else {
      if (data.days.length > 0) {
        res.json([...data.days[data.days.length - 1].checks]);
      } else {
        res.json([]);
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
