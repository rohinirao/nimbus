
# 🌤️ Weather App (Node.js + Express)

A simple weather web application built with Node.js, Express, and the OpenWeatherMap API.  
It shows the **current weather** and a **3-day forecast** for any city in the world.

---

## 📸 Demo

![Weather App Screenshot](https://via.placeholder.com/800x400?text=Weather+App+Demo)  
*TODO*

---

## 🚀 Features

- Search for current weather by city name
- View temperature, weather conditions, and country
- 3-day weather forecast (midday data)
- Simple and responsive design with EJS templating

---

## 🧰 Tech Stack

- Node.js
- Express.js
- EJS (templating engine)
- Axios (for HTTP requests)
- dotenv (to manage API keys)
- OpenWeatherMap API

---

## 🛠️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/rohinirao/nimbus.git
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Get your free API key**

   - Sign up at [https://openweathermap.org/api](https://openweathermap.org/api)
   - Go to your profile and copy the API key

4. **Create a `.env` file**

   Inside the project root, create a `.env` file:

   ```env
   WEATHER_API_KEY=your_openweathermap_api_key
   ```

5. **Start the app**

   ```bash
   node app.js
   ```

6. **Visit in your browser**

   Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
weather-app/
├── views/
│   └── index.ejs           # Main page template
├── public/
│   └── style.css           # Optional styling
├── .env                    # Your API key
├── app.js                  # Main Express server
├── package.json
└── README.md
```

---

## 🧪 Example Usage

```
Search: Munich

Current Weather: 🌡️ 19°C, ☁️ scattered clouds
3-Day Forecast:
- 2025-06-21: 22°C, light rain
- 2025-06-22: 20°C, few clouds
- 2025-06-23: 18°C, broken clouds
```

---

## 📌 TODO / Ideas for Improvement

- [ ] Save recent searches
- [ ] Add unit toggle (°C/°F)
- [ ] Responsive UI with Bootstrap or Tailwind
- [ ] Deploy on Render/Vercel/Glitch

---

## 📄 License

This project is open-source and free to use under the [MIT License](LICENSE).

---

## 👩‍💻 Author

Built with ❤️ by Rohini  
Feel free to fork, improve, or give feedback!