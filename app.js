const express = require("express");
const app = express();
const ejs = require("ejs");
const http = require("http");
const bodyParser = require("body-parser");
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.render("home",{ })
});
app.post("/", function(req, res) {
  const cityName = req.body.cityName
  const apiKey = "YOUR_API_KEY"
  const unit = "metric"
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=" + unit;
  http.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const des = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write('<html>');
      res.write('<link href="https://fonts.googleapis.com/css2?family=Cookie&display=swap" rel="stylesheet">')
      res.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">')
      res.write('<link rel="stylesheet" href="/css/styles.css">')
      res.write('<body>')
        res.write("<img src=" + imageURL + ">");
      res.write("<h2>The weather description is " + des + ".</h2>");
      res.write("<h1>The temperature in "+ cityName +" is " + temp + " Degree Celsius.</h1>");

      res.write('</body>');
      res.write('</html>');
      res.end();
    });
  });
});
app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
