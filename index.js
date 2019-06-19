const express = require("express");
const app = express();
const csv = require("csv-parser");
const fs = require("fs");
const pathToCsvFile = __dirname + "/clustering.csv";
app.set("view engine", "ejs");

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.get("/", (req, res) => {
  data = {};
  results = [];
  fs.createReadStream(pathToCsvFile)
    .pipe(csv())
    .on("data", row => {
      results.push(row);
    })
    .on("end", () => {
      res.json(results);
    });
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
