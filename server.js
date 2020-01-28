require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3333;

const server = express();
server.use(express.json());
server.use(cors());

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`Server running in port ${port}`);
});

server.get("/", (req, res) => {
  res.status(200).json({ message: "The Employee server is up and running!" });
});

let forecast = [
  {
    city: "Chennai",
    day: "Mon",
    high: "65",
    low: "45",
    message: "Cloudy",
    id: 0
  },
  {
    city: "Chennai",
    day: "Tue",
    high: "63",
    low: "45",
    message: "Sunny",
    id: 1
  },
  {
    city: "Chennai",
    day: "Wed",
    high: "23",
    low: "45",
    message: "Cloudy",
    id: 2
  },
  {
    city: "Chennai",
    day: "Thu",
    high: "45",
    low: "45",
    message: "Sunny",
    id: 3
  },
  {
    city: "Dallas",
    day: "Tue",
    high: "63",
    low: "45",
    message: "partlysunny",
    id: 4
  },
  {
    city: "Dallas",
    day: "Wed",
    high: "23",
    low: "45",
    message: "Sunny",
    id: 5
  },
  {
    city: "Bombay",
    day: "Thu",
    high: "45",
    low: "45",
    message: "Rainny",
    id: 6
  },
  {
    city: "Chennai",
    day: "Tue",
    high: "63",
    low: "45",
    message: "Cloudy",
    id: 7
  },
  {
    city: "Chennai",
    day: "Wed",
    high: "23",
    low: "45",
    message: "Sunny",
    id: 8
  },
  {
    city: "Austin",
    day: "Thu",
    high: "45",
    low: "45",
    message: "Sunny",
    id: 9
  }
];

server.get("/forecast/:place", (req, res) => {
  let { place } = req.params;

  let myForecasts = forecast.filter(forecast => forecast.city == place);
  if (myForecasts.length > 0) {
    myForecasts.length = myForecasts.length > 5 ? 5 : myForecasts.length;
    res.status(200).json({
      forecasts: myForecasts,
      currentForecast: myForecasts[0],
      city: place
    });
  } else {
    res
      .status(200)
      .json({ message: "No weather information to display.", city: place });
  }
});

server.get("/cities", (req, res) => {
  let myCities = [...new Set(forecast.map(item => item.city))];
  res.status(200).json(myCities);
});
