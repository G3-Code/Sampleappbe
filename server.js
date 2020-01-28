require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 4000;

const server = express();
server.use(express.json());
server.use(cors());

// server.listen(port, err => {
//   if (err) console.log(err);
//   console.log(`Server running in port ${port}`);
// });

server.get("/", (req, res) => {
  res.status(200).json({ message: "The Weather server is up and running!" });
});

let forecast = [
  {
    city: "Chennai",
    day: "Tue",
    high: "91",
    low: "71",
    message: "Sunny",
    id: 0
  },
  {
    city: "Chennai",
    day: "Wed",
    high: "93",
    low: "68",
    message: "Cloudy",
    id: 1
  },
  {
    city: "Chennai",
    day: "Thu",
    high: "95",
    low: "70",
    message: "Sunny",
    id: 2
  },
  {
    city: "Chennai",
    day: "Fri",
    high: "94",
    low: "71",
    message: "Sunny",
    id: 3
  },
  {
    city: "Chennai",
    day: "Sat",
    high: "92",
    low: "71",
    message: "partlysunny",
    id: 4
  },
  {
    city: "Dallas",
    day: "Tue",
    high: "51",
    low: "43",
    message: "Rainy",
    id: 5
  },
  {
    city: "Dallas",
    day: "Wed",
    high: "47",
    low: "39",
    message: "Cloudy",
    id: 6
  },
  {
    city: "Dallas",
    day: "Thu",
    high: "48",
    low: "40",
    message: "Cloudy",
    id: 7
  },
  {
    city: "Dallas",
    day: "Fri",
    high: "56",
    low: "36",
    message: "Sunny",
    id: 8
  },
  {
    city: "Dallas",
    day: "Sat",
    high: "64",
    low: "42",
    message: "Sunny",
    id: 9
  },
  {
    city: "Austin",
    day: "Tue",
    high: "71",
    low: "44",
    message: "Rainy",
    id: 10
  },
  {
    city: "Austin",
    day: "Wed",
    high: "62",
    low: "43",
    message: "Sunny",
    id: 11
  },
  {
    city: "Austin",
    day: "Thu",
    high: "54",
    low: "44",
    message: "Cloudy",
    id: 12
  },
  {
    city: "Austin",
    day: "Fri",
    high: "61",
    low: "41",
    message: "Sunny",
    id: 13
  },
  {
    city: "Austin",
    day: "Sat",
    high: "70",
    low: "46",
    message: "Sunny",
    id: 14
  },
  {
    city: "London",
    day: "Tue",
    high: "45",
    low: "39",
    message: "Sunny",
    id: 15
  },
  {
    city: "London",
    day: "Wed",
    high: "50",
    low: "45",
    message: "partlysunny",
    id: 16
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

module.exports = server;
