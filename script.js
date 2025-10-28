async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const resultDiv = document.getElementById('weatherResult');
    resultDiv.innerHTML = 'Fetching weather...';
  
    if (!city) {
      resultDiv.innerHTML = 'Please enter a city name.';
      return;
    }
  
    try {
      // Step 1: Get latitude & longitude for the city
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
      const geoData = await geoRes.json();
  
      if (!geoData.results || geoData.results.length === 0) {
        resultDiv.innerHTML = 'City not found. Try again.';
        return;
      }
  
      const { latitude, longitude, name, country } = geoData.results[0];
  
      // Step 2: Get current weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();
  
      const { temperature, windspeed, weathercode } = weatherData.current_weather;
  
      resultDiv.innerHTML = `
        <h3>${name}, ${country}</h3>
        <p>🌡 Temperature: ${temperature}°C</p>
        <p>💨 Wind Speed: ${windspeed} km/h</p>
        <p>☁️ Condition Code: ${weathercode}</p>
      `;
    } catch (error) {
      resultDiv.innerHTML = 'Error fetching weather data.';
    }
  }
  