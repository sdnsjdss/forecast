const apiKey = 'b379f19dac87922866957f9021bbd5d7';

document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value;
    getWeatherData(city);
});

async function getWeatherData(city) {
    try {
        // Получаем координаты города
        const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}$&limit=1&appid=${apiKey}`);
        const geoData = await geoResponse.json();
        if (geoData.length === 0) {
            document.getElementById('weather-result').innerText = 'City not found';
            return;
        }
        const { lat, lon } = geoData[0];
        console.log({ lat, lon })

        // Получаем данные о погоде
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const weatherData = await weatherResponse.json();

        // Отображаем данные о погоде
        displayWeatherData(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-result').innerText = 'Error fetching weather data';
    }
}

function displayWeatherData(data) {
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `
        <p>City: ${data.name}</p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }