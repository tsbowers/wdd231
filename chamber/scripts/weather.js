const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";

// Replace these coordinates with your chamber city's latitude and longitude.
// These are currently set to Salt Lake City, Utah.
const lat = 40.7608;
const lon = -111.8910;

const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

const currentWeather = document.querySelector("#current-weather");
const forecast = document.querySelector("#forecast");

async function getWeather() {
  try {
    const currentResponse = await fetch(currentWeatherURL);
    const forecastResponse = await fetch(forecastURL);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("Unable to fetch weather data.");
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    displayCurrentWeather(currentData);
    displayForecast(forecastData);
  } catch (error) {
    console.error(error);

    if (currentWeather) {
      currentWeather.innerHTML = "<p>Weather data is currently unavailable.</p>";
    }

    if (forecast) {
      forecast.innerHTML = "";
    }
  }
}

function displayCurrentWeather(data) {
  const temperature = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;
  const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  currentWeather.innerHTML = `
    <p>
      <img src="${iconURL}" alt="${description}" width="80" height="80">
      <strong>${temperature}&deg;F</strong>
    </p>
    <p>${capitalizeWords(description)}</p>
  `;
}

function displayForecast(data) {
  forecast.innerHTML = "";

  const dailyForecasts = data.list
    .filter(item => item.dt_txt.includes("12:00:00"))
    .slice(0, 3);

  dailyForecasts.forEach(day => {
    const date = new Date(day.dt_txt);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const temperature = Math.round(day.main.temp);

    const forecastDay = document.createElement("div");
    forecastDay.classList.add("forecast-day");

    forecastDay.innerHTML = `
      <p><strong>${dayName}</strong>: ${temperature}&deg;F</p>
    `;

    forecast.appendChild(forecastDay);
  });
}

function capitalizeWords(text) {
  return text.replace(/\b\w/g, letter => letter.toUpperCase());
}

if (currentWeather && forecast) {
  getWeather();
}