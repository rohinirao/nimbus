require("dotenv").config();

const axios = require("axios");
const fs = require("fs");
const path = require("path");
const history_file = path.join(__dirname, "history.json");


const city = process.argv[2];

if (!city) {
  console.log("Please provide a city name as an argument.");
  process.exit(1);
}

if (city === "--history") { 
  if (fs.existsSync(history_file)) {
    const history_data = JSON.parse(fs.readFileSync(history_file, "utf8"));
    console.log(" Searc History:");
    // history_data.foreach()
    history_data.forEach((entry, index) => {
      console.log(`${index + 1}. ${entry.city} @ ${entry.time} `)
    });
   } else  {
    console.log("No history yet.");
    process.exit(0);
  }
} 

const API_KEY = process.env.WEATHER_API_KEY;
const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

axios
  .get(URL)
  .then((response) => {
    const data = response.data;
    const weather = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;

    console.log(`Weather in ${city}:`);
    console.log(`Description: ${weather}`);
    console.log(`Temperature: ${temperature}°C`);
    console.log(`Humidity: ${humidity}%`);
    saveToHistory(city);
    getForecast(city);
  })
  .catch((error) => {
    if (error.response) {
      console.error("Error:", error.response.data.message);
    } else {
      console.error("Error:", error.message);
    }
  });

  function getForecast(city) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  
    axios.get(forecastUrl)
      .then((res) => {
        const forecastData = res.data.list;
  
        console.log(`\n📅 3-Day Forecast for ${res.data.city.name}:\n`);
  
        const dailyForecast = {};
  
        // Filter forecasts near 12:00 PM
        forecastData.forEach((entry) => {
          const date = entry.dt_txt.split(" ")[0];
          const time = entry.dt_txt.split(" ")[1];
  
          if (time === "12:00:00" && Object.keys(dailyForecast).length < 3) {
            dailyForecast[date] = {
              temp: entry.main.temp,
              condition: entry.weather[0].description,
            };
          }
        });
  
        for (const [date, info] of Object.entries(dailyForecast)) {
          console.log(`📆 ${date}`);
          console.log(`   🌡️ ${info.temp}°C`);
          console.log(`   ☁️ ${info.condition}\n`);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch forecast:", err.message);
      });
  }
  

function saveToHistory(city) {
  let history = [];
  if (fs.existsSync(history_file)) {
    const data = fs.readFileSync(history_file, "utf8");
    history = JSON.parse(data);
  }

  history.unshift({city, time: new Date().toISOString()});
  history = history.slice(0, 5);

  fs.writeFileSync(history_file, JSON.stringify(history, null, 2));
}