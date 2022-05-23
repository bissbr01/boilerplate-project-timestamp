// index.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

//middleware
app.use((req, res, next) => {

  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/api/:date(\\d{4}-\\d{2}-\\d{2})", (req, res) => {
  const date = new Date(req.params.date); // month is 0 indexed in Date
  const unix = Math.floor(date.getTime());
  const utc = date.toUTCString();
  res.json({ unix: unix, utc: utc });
});

app.get("/api/:unix(\\d{13})", (req, res) => {
  const unix = parseInt(req.params.unix);
  const utc = new Date(unix).toUTCString();  //convert from seconds to miliseconds base
  res.json({ unix: unix, utc: utc });
});

// listen for requests :)
const listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
