let currentDateTime = new Date();

let hour = currentDateTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minute = currentDateTime.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentDateTime.getDay()];

let month = currentDateTime.getMonth() + 1;

let date = currentDateTime.getDate();

function showDayAndTime() {
  let currentDayandTime = document.querySelector("h4.date-time");
}

function displayWeatherForSearchedCity(response) {
  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#city-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like-temp").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#current-weather-conditions").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#sunrise").innerHTML = response.data.sys.sunrise;
  document.querySelector("#sunset").innerHTML = response.data.sys.sunset;
}

function searchCity(city) {
  let apiKey = "906eb52d0f658b640312a572c13864cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherForSearchedCity);
}

function displaySearchedCity(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCurrentLocation(position) {
  let apiKey = "906eb52d0f658b640312a572c13864cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherForSearchedCity);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

function convertTempToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temperature");
  temperatureElement.innerHTML = "66°F";
}

function convertTempToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temperature");
  temperatureElement.innerHTML = "19°C";
}

let currentDayandTime = document.querySelector("h4.date-time");
currentDayandTime.innerHTML = `${day} ${month}/${date} ${hour}:${minute}`;

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", displaySearchedCity);

let fahrenheitTemp = document.querySelector("#fahrenheit-temp");
fahrenheitTemp.addEventListener("click", convertTempToFahrenheit);

let celsiusTemp = document.querySelector("#celsius-temp");
celsiusTemp.addEventListener("click", convertTempToCelsius);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Ottawa");

// TO DO:
// Update all of the °C and °F to be shown in C or F based on the unit selected for the .current-temperature class
// <div class="scale-preference">
//      <span class="units">
//       <a href="#" id="celsius-temp">°C</a> |
//       <a href="#" id="fahrenheit-temp">°F</a>
//      </span>
//    </div>
//   <div class="current-temperature">
//      1°C
//    </div>
//    <div class="feels-like">
//      Feels Like 0°C
//    </div>
//    <div class="current-weather">
//       Clear
//    </div>
//    <div class="max-temp">
//      H: 20°C
//    </div>
//    <div class="min-temp">
//      L: 1°C
//    </div>
