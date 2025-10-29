import { getWeather } from 'apiService';
import { updateWeatherDisplay, showError, showLoading } from 'weatherDisplay';

const locationInput = document.getElementById('location-input');
const searchButton = document.getElementById('search-button');

/**
 * Handles the search action triggered by button click or Enter key.
 */
async function handleSearch() {
    const city = locationInput.value.trim();
    if (!city) {
        showError("Please enter a location.");
        return;
    }

    showLoading();
    
    try {
        const weatherData = await getWeather(city);
        updateWeatherDisplay(weatherData);
    } catch (error) {
        console.error("Failed to fetch weather:", error);
        showError(`Could not find weather for "${city}". Try "Tokyo" or "London".`);
    }
}

// Event Listeners
searchButton.addEventListener('click', handleSearch);

locationInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});


// Initialize with a default location on load
window.addEventListener('load', () => {
    // We set San Francisco as default as it is handled by the generic fallback in apiService
    locationInput.value = "San Francisco"; 
    handleSearch();
});

