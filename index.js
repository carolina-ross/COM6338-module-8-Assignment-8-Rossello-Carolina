// Your code here
var sectionWeather = document.querySelector('#weather');
var inputLocation = document.querySelector('#weather-search');
var buttonSubmit = document.querySelector('button[type="submit"]');

inputLocation.setAttribute( "autocomplete", "off" ); 
buttonSubmit.addEventListener('click', onSearch);

function searchWeather(location) { 
    const apiKey = 'a76b32bf5b491e65fd99110fed59d0ba';
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${location},us&appid=${apiKey}`;

    fetch(url)
        .then (response => response.json())
        .then (data => {
            if(data !== null){
              showWeather(data);
            }
        })      
}

function showWeather(data) {  
    if(data.cod === '404' || data.cod === '400'){
        sectionWeather.innerHTML = '<p>Location Not Found</p>';  
    }
    else{
        if(data.cod === 200){
            const { coord: {lat, lon}, main: { feels_like, temp }, name, sys: {country}, weather: {[0]: {description, icon}}} = data;
            const tempFahrenheit = kelvinFahrenheit(temp);
            const feelLike = kelvinFahrenheit(feels_like);
            var dateTime = new Date();
            var currentTime = dateTime.toLocaleTimeString(navigator.language, {
                hour: '2-digit',
                minute:'2-digit'
              });
            
            sectionWeather.innerHTML = `
                <h2>${ name },  ${ country }</h2>
                <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="__BLANK">Click to view map</a>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
                <p style="text-transform: capitalize;">${description}</p><br>
                <p>Current: ${ tempFahrenheit } ° F</p>
                <p>Feels like: ${feelLike} F</p><br>
                <p>Last updated: ${currentTime}</p>
            `;
        }
    }    
}

function kelvinFahrenheit(temp) {
    return parseInt(temp - 273.15) * 9/5 + 32;
}

function onSearch(e) {
    e.preventDefault();
    inputLocation.setAttribute( "autocomplete", "off" ); 
    const location = inputLocation.value; 
    searchWeather(location);
    inputLocation.value = '';    
}



