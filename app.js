require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const { error } = require('console');

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.WEATHER_API_KEY;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.render('index', {weather: null, forecast: null, error: null});
});

app.post('/', async (req, res) => {
  const city = req.body.city;
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const [weatherRes, forecastRes] = await Promise.all([
      axios.get(weatherURL),
      axios.get(forecastURL)
    ]);
    const weather = {
      city: weatherRes.data.name,
      country: weatherRes.data.sys.country,
      temp: weatherRes.data.main.temp,
      description: weatherRes.data.weather[0].description
    }

    const forecastLlist = forecastRes.data.list;
    const forecast = []

    for (let entry of forecastLlist) {
      const [date, time] = entry.dt_txt.split(" ");
      if (time === "12:00:00" && forecast.length < 3) {
        forecast.push({
          date,
          temp: entry.main.temp,
          description: entry.weather[0].description
        });
      }
    }
    res.render('index', {weather, forecast, error: null})
  } catch (error) {
    res.render('index', {weather: null, forecast: null, error: "City not found or API error."});
  }
});

app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});

