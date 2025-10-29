const WEATHER_ICONS = {
    Sunny: 'sunny.png',
    Rain: 'rainy.png',
    Clouds: 'cloudy.png',
    Clear: 'sunny.png',
    Thunderstorm: 'rainy.png',
    Mist: 'cloudy.png'
};

const MOCK_DATA = {
    "london": {
        location: "London, UK",
        temperature: 12,
        condition: "Clouds",
        iconPath: WEATHER_ICONS.Clouds,
        details: {
            feelsLike: 10,
            humidity: 80,
            windSpeed: 18,
            pressure: 1012,
        },
        forecast: [
            { day: "Tue", max: 13, min: 8, condition: "Clouds", iconPath: WEATHER_ICONS.Clouds },
            { day: "Wed", max: 10, min: 5, condition: "Rain", iconPath: WEATHER_ICONS.Rain },
            { day: "Thu", max: 15, min: 7, condition: "Clear", iconPath: WEATHER_ICONS.Clear },
            { day: "Fri", max: 16, min: 9, condition: "Sunny", iconPath: WEATHER_ICONS.Sunny },
            { day: "Sat", max: 11, min: 6, condition: "Rain", iconPath: WEATHER_ICONS.Rain },
            { day: "Sun", max: 12, min: 7, condition: "Clouds", iconPath: WEATHER_ICONS.Clouds },
        ]
    },
    "tokyo": {
        location: "Tokyo, Japan",
        temperature: 25,
        condition: "Sunny",
        iconPath: WEATHER_ICONS.Sunny,
        details: {
            feelsLike: 26,
            humidity: 55,
            windSpeed: 5,
            pressure: 1020,
        },
        forecast: [
            { day: "Tue", max: 27, min: 18, condition: "Sunny", iconPath: WEATHER_ICONS.Sunny },
            { day: "Wed", max: 28, min: 19, condition: "Clear", iconPath: WEATHER_ICONS.Clear },
            { day: "Thu", max: 25, min: 20, condition: "Mist", iconPath: WEATHER_ICONS.Mist },
            { day: "Fri", max: 26, min: 17, condition: "Clouds", iconPath: WEATHER_ICONS.Clouds },
            { day: "Sat", max: 24, min: 16, condition: "Rain", iconPath: WEATHER_ICONS.Rain },
        ]
    }
};

/**
 * Simulates fetching weather data for a given city.
 * In a real application, this would involve a fetch() call to a weather API.
 * @param {string} city 
 * @returns {Promise<Object>} Weather data object.
 */
export async function getWeather(city) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const standardizedCity = city.toLowerCase().trim();

    if (MOCK_DATA[standardizedCity]) {
        return MOCK_DATA[standardizedCity];
    } 
    
    // Default fallback or error simulation
    if (standardizedCity.includes("san francisco")) {
        // Provide a default structure for cities not explicitly mocked
        return {
            location: "San Francisco, USA",
            temperature: 18,
            condition: "Clear",
            iconPath: WEATHER_ICONS.Clear,
            details: {
                feelsLike: 17,
                humidity: 65,
                windSpeed: 15,
                pressure: 1015,
            },
            forecast: [
                { day: "Tue", max: 19, min: 14, condition: "Clear", iconPath: WEATHER_ICONS.Clear },
                { day: "Wed", max: 21, min: 15, condition: "Sunny", iconPath: WEATHER_ICONS.Sunny },
                { day: "Thu", max: 18, min: 13, condition: "Mist", iconPath: WEATHER_ICONS.Mist },
                { day: "Fri", max: 20, min: 14, condition: "Clouds", iconPath: WEATHER_ICONS.Clouds },
                { day: "Sat", max: 17, min: 12, condition: "Rain", iconPath: WEATHER_ICONS.Rain },
            ]
        };
    }

    // Simulate 404/not found error
    throw new Error("Location not found");
}

