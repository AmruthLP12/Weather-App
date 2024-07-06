// const url = 'https://visual-crossing-weather.p.rapidapi.com/forecast?contentType=csv&unitGroup=us&aggregateHours=24&location=Washington%2CDC%2CUSA&shortColumnNames=false';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '1f35c8e57dmsh3af930d14088d41p151c95jsn0e28fdd9f0ad',
// 		'x-rapidapi-host': 'visual-crossing-weather.p.rapidapi.com'
// 	}
// };

// // try {
// // 	const response = await fetch(url, options);
// // 	const result = await response.text();
// // 	console.log(result);
// // } catch (error) {
// // 	console.error(error);
// // }

// // Define an async function to fetch weather data
// async function fetchWeather() {
//     try {
//         const response = await fetch(url, options);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const result = await response.text();
//         console.log(result);
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//     }
// }

// // Call the async function to execute the fetch
// fetchWeather();

const apiKey = '1f35c8e57dmsh3af930d14088d41p151c95jsn0e28fdd9f0ad';
const apiHost = 'visual-crossing-weather.p.rapidapi.com';

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city');
        return;
    }

    const url = `https://${apiHost}/forecast?contentType=csv&unitGroup=us&aggregateHours=24&location=${encodeURIComponent(city)}&shortColumnNames=false`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.text();
        parseAndDisplayWeatherData(result);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again later.');
    }
}

function parseAndDisplayWeatherData(data) {
    // Parse CSV data
    const lines = data.split('\n');
    const headers = lines[0].split(',');

    // Find indices of relevant fields
    const tempIndex = headers.indexOf('Temperature');
    const conditionsIndex = headers.indexOf('Conditions');

    // Extract first data row (assuming daily data)
    const firstRow = lines[1].split(',');

    // Extract temperature and conditions
    const temperature = firstRow[tempIndex];
    const conditions = firstRow[conditionsIndex];

    // Display data in HTML
    document.getElementById('temp-div').innerText = `Temperature: ${temperature}°F`;
    document.getElementById('weather-info').innerText = `Conditions: ${conditions}`;
    document.getElementById('weather-icon').src = getWeatherIcon(conditions);
}

function getWeatherIcon(conditions) {
    // This function maps conditions to an appropriate weather icon
    // You can expand this function to include more detailed mappings
    if (conditions.includes('cloudy')) {
        return 'cloudy-icon.png'; // Replace with actual path to your cloudy icon
    } else if (conditions.includes('rain')) {
        return 'rainy-icon.png'; // Replace with actual path to your rainy icon
    } else if (conditions.includes('clear')) {
        return 'clear-icon.png'; // Replace with actual path to your clear weather icon
    } else {
        return 'default-weather-icon.png'; // Replace with a default icon
    }
}

// Add event listener to the button (alternative way to onclick in HTML)
document.querySelector('button').addEventListener('click', getWeather);
