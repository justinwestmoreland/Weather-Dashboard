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



function updateDisplay(weatherData) {
    var currentTemp = weatherData.main.temp;
    var currentHumidity = weatherData.main.humidity;
    // Find out how to put weatherData.weather.icon where this 10d is. 
    var currentImg = 'http://openweathermap.org/img/w/10d.png'
    var currentWindSpeed = weatherData.wind.speed;
    var currentUVIndex = weatherData

    // console.log(currentTemp);
    // console.log(currentHumidity);
    document.getElementById('current-temp').textContent = currentTemp;
    document.getElementById('current-humidity').textContent = currentHumidity;
    document.getElementById('current-img').src = currentImg;
    document.getElementById('current-wind').textContent = currentWindSpeed;
    document.getElementById('current-city').textContent = testCity;
    return
};

function updateForecastDisplay(forecastData) {
    forecastData = JSON.parse(forecastData);

    // Day 1 Information
    var day1Temp = forecastData.list[2].main.temp;
    var day1Img = 'http://openweathermap.org/img/w/04d.png';
    var day1Hum = forecastData.list[2].main.humidity;
    document.getElementById('temp1').textContent = day1Temp;
    document.getElementById('img1').src = day1Img;
    document.getElementById('humidity1').textContent = day1Hum;

    // Day 2 Information
    var day2Temp = forecastData.list[10].main.temp;
    var day2Img = 'http://openweathermap.org/img/w/04d.png';
    var day2Hum = forecastData.list[10].main.humidity;
    document.getElementById('temp2').textContent = day2Temp;
    document.getElementById('img2').src = day2Img;
    document.getElementById('humidity2').textContent = day2Hum;

    // Day 3 Information
    var day3Temp = forecastData.list[18].main.temp;
    var day3Img = 'http://openweathermap.org/img/w/04d.png';
    var day3Hum = forecastData.list[18].main.humidity;
    document.getElementById('temp3').textContent = day3Temp;
    document.getElementById('img3').src = day3Img;
    document.getElementById('humidity3').textContent = day3Hum;

    // Day 4 Information
    var day4Temp = forecastData.list[26].main.temp;
    var day4Img = 'http://openweathermap.org/img/w/04d.png';
    var day4Hum = forecastData.list[26].main.humidity;
    document.getElementById('temp4').textContent = day4Temp;
    document.getElementById('img4').src = day4Img;
    document.getElementById('humidity4').textContent = day4Hum;

    // Day 5 Information
    var day5Temp = forecastData.list[34].main.temp;
    var day5Img = 'http://openweathermap.org/img/w/04d.png';
    var day5Hum = forecastData.list[34].main.humidity;
    document.getElementById('temp5').textContent = day5Temp;
    document.getElementById('img5').src = day5Img;
    document.getElementById('humidity5').textContent = day5Hum;




    return
}

// Current Weather
var testCity = 'Boston';
fetch('http://api.openweathermap.org/data/2.5/weather?q=' + testCity + '&APPID=de6cda6ee489e5192ad8edc5d0f21166&units=imperial')
    .then(response => response.json())
    .then(data => {
        if (data) {
            weatherForecast(data.id)
            updateDisplay(data);
        }
        return;

    })

function weatherForecast(cityId) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=de6cda6ee489e5192ad8edc5d0f21166&units=imperial", requestOptions)
        .then(response => response.text())
        .then(result => {
            updateForecastDisplay(result)
        })

    .catch(error => console.log('error', error));
}

// api.openweathermap.org/data/2.5/forecast?id={city ID}&appid={API key}

// 5 Day Forecast
// fetch('http:api.openweathermap.org/data/2.5/forecast?q=' + testCity + '&appid=de6cda6ee489e5192ad8edc5d0f21166')
//     .then(response => response.json())
//     .then(data => console.log(data))

var cityName = document.getElementById('city-name');
var searchButton = document.getElementById('search-button');
var newCity = document.createElement('li'); // li
var searchList = document.querySelector('ul'); // ul

/// I don't know how to do this. You need to figure this ish out. How do you search and then get this stuff to auto update. 

function startSearch() {
    console.log(cityName.value);
    newCity.textContent = cityName.value;
    console.log(newCity.textContent);
    newCity.classList.add('cities');
    console.log(newCity);
    console.log(searchList);
    searchList.prepend(newCity);
}

searchButton.addEventListener("click", startSearch);
// });