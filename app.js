//Necessary packages
const { log } = require("console");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//HTML Code
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//Post function
app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "1a7bacdd840791b682285419c3aa5f8c";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    unit +
    "&appid=" +
    apiKey;

  https.get(url, function (response) {
    console.log(response);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);

      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      console.log(temp + description);
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<!DOCTYPE html>");
      res.write("<html lang='en'>");
      res.write("<head>");
      res.write("<meta charset='UTF-8'>");
      res.write(
        "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
      );
      res.write("<title>Weather</title>");
      res.write("<link rel='stylesheet' type='text/css' href='styles.css'>");
      res.write("</head>");
      res.write("<body>");
      res.write("<div class='container'>");
      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degrees Celsius</h1>"
      );
      res.write("<img src='" + imageURL + "' alt='weather icon'>");
      res.write("<p>The weather is " + description + "</p>");
      res.write("</div>");
      res.write("</body>");
      res.write("</html>");
      res.send();
    });
  });
});

//App listen server
app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
