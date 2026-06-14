const weatherCard = document.querySelector("#weather-card");

// Fayetteville, Arkansas
const latitude = 36.0822;
const longitude = -94.1719;

function getWeatherDescription(code) {
    const codes = {
        0: "Clear",
        1: "Mostly Clear",
        2: "Partly Cloudy",
        3: "Overcast",
        45: "Fog",
        51: "Drizzle",
        53: "Drizzle",
        55: "Heavy Drizzle",
        61: "Rain",
        63: "Rain",
        65: "Heavy Rain",
        71: "Snow",
        73: "Snow",
        75: "Heavy Snow",
        80: "Showers",
        81: "Heavy Showers",
        82: "Storm Showers",
        95: "Thunderstorm"
    };

    return codes[code] || "Unknown";
}

async function getWeather() {
    if (!weatherCard) return;

    try {
        const url =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
            `&temperature_unit=fahrenheit` +
            `&timezone=auto` +
            `&current=temperature_2m,weather_code,cloud_cover` +
            `&daily=temperature_2m_max,temperature_2m_min,weather_code,cloud_cover_max`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather data unavailable");
        }

        const data = await response.json();

        displayWeather(data);

    } catch (error) {
        weatherCard.innerHTML = `
            <p>Weather information is unavailable.</p>
        `;

        console.error(error);
    }
}

function displayWeather(data) {
    const current = data.current;
    const daily = data.daily;

    weatherCard.innerHTML = `
        <div class="weather-header">
            <h2>Weather</h2>

            <div class="current-summary">
                <span>${Math.round(current.temperature_2m)}°F</span>
                <span>${getWeatherDescription(current.weather_code)}</span>
                <span>☁ ${current.cloud_cover}%</span>
            </div>
        </div>

        <div class="forecast-grid">
            ${daily.time.slice(0, 7).map((day, index) => `
                <div class="forecast-card">
                    <strong>
                        ${new Date(day).toLocaleDateString("en-US", {
                            weekday: "short"
                        })}
                    </strong>

                    <p>
                        ${Math.round(daily.temperature_2m_max[index])}°
                    </p>

                    <small>
                        ${getWeatherDescription(
                            daily.weather_code[index]
                        )}
                    </small>
                </div>
            `).join("")}
        </div>
    `;
}

getWeather();