// Moment.js code to update current date for current forecast
// and update the dates for the 5 day forecast
var currentDate = moment().format('LL');
$("#current-date").text(currentDate);
var date1 = moment().add(1, 'days').format('L');
var date2 = moment().add(2, 'days').format('L');
var date3 = moment().add(3, 'days').format('L');
var date4 = moment().add(4, 'days').format('L');
var date5 = moment().add(5, 'days').format('L');
$("#date1").text(date1);
$("#date2").text(date2);
$("#date3").text(date3);
$("#date4").text(date4);
$("#date5").text(date5);

// This function updates data displayed for the current weather conditions from our API.

function updateDisplay(weatherData) {
    var currentTemp = weatherData.main.temp;
    var currentHumidity = weatherData.main.humidity;
    var currentImg = 'https://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png'
    var currentWindSpeed = weatherData.wind.speed;
    var cityName = weatherData.name;

    document.getElementById('current-temp').textContent = currentTemp;
    document.getElementById('current-humidity').textContent = currentHumidity;
    document.getElementById('current-img').src = currentImg;
    document.getElementById('current-wind').textContent = currentWindSpeed;
    document.getElementById('current-city').textContent = cityName;
    return
};

// This function updates data displayed for the forecasted weather conditions from the onecall API.

function updateForecastDisplay(forecastData) {
    forecastData = JSON.parse(forecastData);
    console.log("forecast Data", forecastData);
    // Day 1 Information
    var day1Temp = forecastData.daily[0].temp.day;
    var day1Img = 'https://openweathermap.org/img/w/' + forecastData.daily[0].weather[0].icon + '.png';
    var day1Hum = forecastData.daily[0].humidity;
    document.getElementById('temp1').textContent = day1Temp;
    document.getElementById('img1').src = day1Img;
    document.getElementById('humidity1').textContent = day1Hum;

    // Day 2 Information
    var day2Temp = forecastData.daily[1].temp.day;
    var day2Img = 'https://openweathermap.org/img/w/' + forecastData.daily[1].weather[0].icon + '.png';
    var day2Hum = forecastData.daily[1].humidity;
    document.getElementById('temp2').textContent = day2Temp;
    document.getElementById('img2').src = day2Img;
    document.getElementById('humidity2').textContent = day2Hum;

    // // Day 3 Information
    var day3Temp = forecastData.daily[2].temp.day;
    var day3Img = 'https://openweathermap.org/img/w/' + forecastData.daily[2].weather[0].icon + '.png';
    var day3Hum = forecastData.daily[2].humidity;
    document.getElementById('temp3').textContent = day3Temp;
    document.getElementById('img3').src = day3Img;
    document.getElementById('humidity3').textContent = day3Hum;

    // // Day 4 Information
    var day4Temp = forecastData.daily[3].temp.day;
    var day4Img = 'https://openweathermap.org/img/w/' + forecastData.daily[3].weather[0].icon + '.png';
    var day4Hum = forecastData.daily[3].humidity;
    document.getElementById('temp4').textContent = day4Temp;
    document.getElementById('img4').src = day4Img;
    document.getElementById('humidity4').textContent = day4Hum;

    // // Day 5 Information
    var day5Temp = forecastData.daily[4].temp.day;
    var day5Img = 'https://openweathermap.org/img/w/' + forecastData.daily[4].weather[0].icon + '.png';
    var day5Hum = forecastData.daily[4].humidity;
    document.getElementById('temp5').textContent = day5Temp;
    document.getElementById('img5').src = day5Img;
    document.getElementById('humidity5').textContent = day5Hum;
    return
}

// This function updates UV data displayed for the forecasted weather conditions by calling a second API using the lat and lon from
// the original API data.

function updateUV(oneCallResults) {
    oneCallResults = JSON.parse(oneCallResults)
    console.log("one call results", oneCallResults);

    var currentUV = oneCallResults.current.uvi;
    document.getElementById("current-uv-index").textContent = currentUV;
}

// This API is fetched to capture the current weather data, as well as gather the data for the forecast and UV index API calls.

function getWeather(testCity) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + testCity + "&APPID=de6cda6ee489e5192ad8edc5d0f21166&units=imperial", requestOptions)
        .then(response => response.text())
        .then(result => {
            if (result) {
                result = JSON.parse(result)
                console.log(result);
                // weatherForecast(result.id)
                updateDisplay(result);
                uvIndex(result.coord.lat, result.coord.lon);
            }
            return;

        })
        .catch(error => console.log('error', error));

}

// This function calls the UVIndex and ForecastDisplay data using the lat and lon from the previous API call
function uvIndex(lat, lon) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=de6cda6ee489e5192ad8edc5d0f21166&units=imperial", requestOptions)
        .then(response => response.text())
        .then(result => {
            updateUV(result);
            updateForecastDisplay(result);
        })
        .catch(error => console.log('error', error));
}

/// I don't know how to do this. You need to figure this ish out. How do you search and then get this stuff to auto update. 
var cityName = document.getElementById('city-name');
var searchButton = document.getElementById('search-button');
var cityHistory = document.querySelector('cities')
var searchList = document.querySelector('ul'); // ul
var searchHistory = JSON.parse(window.localStorage.getItem('Search History')) || [];



function startSearch() {
    var newCity = document.createElement('li'); // li
    newCity.textContent = searchHistory[i];
    newCity.classList.add('cities');
    searchList.prepend(newCity);
    searchHistory.push(cityName.value);
    localStorage.setItem('Search History', JSON.stringify(searchHistory));
    getWeather(cityName.value);

    for (var i = 0; i < searchHistory.length; i++) {}
    // var newCity = document.createElement('button'); // li
    // newCity.textContent = searchHistory[i];
    // newCity.classList.add('cities');
    // searchList.prepend(newCity.textContent);
}



searchButton.addEventListener('click', startSearch);