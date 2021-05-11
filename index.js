function formatDateTime(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let month = date.getMonth() + 1;

  let day = date.getDate();

  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let dayOfWeek = weekdays[date.getDay()];

  return `${dayOfWeek} ${month}/${day} ${hour}:${minutes}`;
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hour}:${minutes}`;
}

function formatApiShortTermForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return weekdays[day];
}

function displayShortTermForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast"); // new element referenced above

  let forecastHTML = `<div class="row">`; // we're creating here a new string element that just has a row

  forecast.forEach(function(forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML + // removed the below HTML from the HTML file to handle from here in JS
        ` 
      <div class="col-2"> 
        <div class="forecast-weekdays">${formatApiShortTermForecastDate(
          forecastDay.dt
        )}</div>
          <img
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="42"
          />
          <div class="forecast-temperatures">
            <span class="forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}°</span>
            <span class="forecast-temperature-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
       </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`; // here we're closing the </div> MUST DO!!!
  forecastElement.innerHTML = forecastHTML; // this is putting the result of the above function in the forecast element that was selected before ("#forecast")
}

function getForecast(coordinates) {
  let apiKey = "906eb52d0f658b640312a572c13864cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayShortTermForecast);
}

function displayWeatherForSearchedCity(response) {
  let dateElement = document.querySelector("#date-and-time");
  let iconElement = document.querySelector("#emoji");

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

  celsiusTemperature = response.data.main.temp;
  dateElement.innerHTML = formatDateTime(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "906eb52d0f658b640312a572c13864cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherForSearchedCity);
}

function displaySearchedCity(event) {
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

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", displaySearchedCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Ottawa");
