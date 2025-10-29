const app = document.getElementById('app');
const content = document.getElementById('weather-content');
const locationNameEl = document.getElementById('location-name');
const tempEl = document.getElementById('temperature');
const conditionEl = document.getElementById('condition-description');
const iconEl = document.getElementById('weather-icon');
const forecastListEl = document.getElementById('forecast-list');
const feelsLikeEl = document.getElementById('feels-like');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');
const pressureEl = document.getElementById('pressure');
const errorEl = document.getElementById('error-message');

/**
 * Maps common weather conditions to CSS classes for visual theming.
 * @param {string} condition 
 * @returns {string} CSS class name
 */
function mapConditionToTheme(condition) {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) return 'sunny';
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) return 'rainy';
    if (lowerCondition.includes('storm') || lowerCondition.includes('thunder')) return 'storm';
    if (lowerCondition.includes('cloud') || lowerCondition.includes('mist') || lowerCondition.includes('fog')) return 'cloudy';
    return 'sunny'; // Default
}

/**
 * Renders the forecast data.
 * @param {Array<Object>} forecast 
 */
function renderForecast(forecast) {
    forecastListEl.innerHTML = '';
    forecast.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'forecast-item';
        itemEl.innerHTML = `
            <div class="day">${item.day}</div>
            <img src="${item.iconPath}" alt="${item.condition}">
            <div class="temp-max">${item.max}°C</div>
            <div class="temp-min">${item.min}°C</div>
        `;
        // Add a micro-interaction detail on click
        itemEl.addEventListener('click', () => {
            alert(`${item.day} forecast: ${item.condition}. Max: ${item.max}°C / Min: ${item.min}°C`);
        });
        forecastListEl.appendChild(itemEl);
    });
}

/**
 * Updates the UI with new weather data.
 * @param {Object} data 
 */
export function updateWeatherDisplay(data) {
    // 1. Apply Dynamic Theme
    const theme = mapConditionToTheme(data.condition);
    // Remove all existing themes and add the new one
    app.className = 'weather-app'; // Reset class list
    app.classList.add(theme);

    // 2. Update Main Weather Info
    locationNameEl.textContent = data.location;
    tempEl.textContent = `${data.temperature}°C`;
    conditionEl.textContent = data.condition;
    iconEl.src = data.iconPath;
    iconEl.alt = data.condition + ' icon';

    // 3. Update Details
    feelsLikeEl.textContent = `${data.details.feelsLike}°C`;
    humidityEl.textContent = `${data.details.humidity}%`;
    windSpeedEl.textContent = `${data.details.windSpeed} km/h`;
    pressureEl.textContent = `${data.details.pressure} hPa`;

    // 4. Update Forecast
    renderForecast(data.forecast);
    
    // 5. Show Content and Hide Error
    // We add a class to reset max-height if it was collapsed by 'hidden'
    content.style.maxHeight = '1000px'; 
    content.classList.remove('hidden');
    errorEl.classList.add('hidden');
}

/**
 * Handles showing loading state (Optional, but good UX)
 */
export function showLoading() {
    content.classList.add('hidden');
    errorEl.classList.add('hidden');
}

/**
 * Handles showing an error message.
 * @param {string} message 
 */
export function showError(message) {
    content.classList.add('hidden');
    content.style.maxHeight = '0'; // Ensure content collapses fully
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
    app.className = 'weather-app'; // Reset theme on error
}

