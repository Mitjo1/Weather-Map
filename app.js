const express = require("express");
const https = require("https");

const app = express();

app.get("/", function (req, res) {
  res.send("Server is up and running");
});

const url =
  "https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=1a7bacdd840791b682285419c3aa5f8c";

https.get(url, function (response) {
  console.log(response);
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
