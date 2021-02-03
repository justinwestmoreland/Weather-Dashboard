// API Keys


// $(document).ready(function() {
// Current Weather
var testCity = 'denver';
fetch('http://api.openweathermap.org/data/2.5/weather?q=' + testCity + '&APPID=de6cda6ee489e5192ad8edc5d0f21166')
    .then(response => response.json())
    .then(data => console.log(data))
    .then(data => console.log(typeof [4, 5, 6, 7]))



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