const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API Key

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            document.getElementById("error").textContent = "City not found!";
            document.querySelector(".weather-info").style.display = "none";
        } else {
            document.getElementById("cityName").textContent = data.name + ", " + data.sys.country;
            document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
            document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
            document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById("windSpeed").textContent = `Wind Speed: ${data.wind.speed} m/s`;

            const iconCode = data.weather[0].icon;
            document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}.png`;

            document.querySelector(".weather-info").style.display = "block";
            document.getElementById("error").textContent = "";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("error").textContent = "An error occurred. Please try again.";
    }
}
