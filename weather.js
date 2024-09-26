const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const APIKey = '55dc6006133ab8a9cf2ccce2efaf8e89';

searchButton.addEventListener('click', () => {
    const city = document.querySelector('.search-box input').value.trim();
    if (city === '') return;

    fetchWeatherData(city);
});

function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => handleWeatherResponse(data))
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}

function handleWeatherResponse(data) {
    if (data.cod === '404') {
        showError();
    } else {
        hideError();
        updateWeatherDetails(data);
    }
}

function showError() {
    container.style.height = '400px';
    weatherBox.style.display = 'none';
    weatherDetails.style.display = 'none';
    error404.style.display = 'block';
    error404.classList.add('fadeIn');
}

function hideError() {
    error404.style.display = 'none';
    error404.classList.remove('fadeIn');
}

function updateWeatherDetails(data) {
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    const weatherCondition = data.weather[0].main;
    updateWeatherIcon(image, weatherCondition);

    temperature.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${Math.round(data.wind.speed)} Km/h`;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';
}

function updateWeatherIcon(imageElement, weatherCondition) {
    const weatherIcons = {
        'Clear': 'imgs/clear.png',
        'Rain': 'imgs/rain.png',
        'Snow': 'imgs/snow.png',
        'Clouds': 'imgs/cloud.png',
        'Haze': 'imgs/mist.png'
    };
    
    imageElement.src = weatherIcons[weatherCondition] || '';
}
