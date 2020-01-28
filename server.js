require("dotenv").config();
const express = require("express");
const cors = require("cors");
const forecast = require("./data/data.js");
const port = process.env.PORT || 4000;

const server = express();
server.use(express.json());
server.use(cors());

// Server listening to local port or to the port from Heroku app.

if (process.env.NODE_ENV !== "test") {
  server.listen(port, err => {
    if (err) console.log(err);
    console.log(`Server running in port ${port}`);
  });
}

//To check if the server is running
server.get("/", (req, res) => {
  res.status(200).json({ message: "The Weather server is up and running!" });
});

/**
 * Gets the forecast for a particular place
 */
server.get("/forecast/:place", (req, res) => {
  //Gets the name of the place
  let { place } = req.params;

  //Filters the forecast for that place
  let myForecasts = forecast.filter(forecast => forecast.city == place);

  //If forecast is available sends the forecast. Otherwise sends the message.
  if (myForecasts.length > 0) {
    myForecasts.length = myForecasts.length > 5 ? 5 : myForecasts.length;
    res.status(200).json({
      forecasts: myForecasts,
      currentForecast: myForecasts[0],
      city: place
    });
  } else {
    res
      .status(204)
      .json({ message: "No weather information to display.", city: place });
  }
});

/**
 * Gets the distinct list of cities for the drop down.
 */
server.get("/cities", (req, res) => {
  // Gets the unique list of cities
  let myCities = [...new Set(forecast.map(item => item.city))];
  res.status(200).json(myCities);
});

module.exports = server;
