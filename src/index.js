//CURRENT DATE AND TIME

let now = new Date();
let h4 = document.querySelector("#date-now");
let date = now.getDate("#date-now");
let year = now.getFullYear("#date-now");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
h4.innerHTML = `${day} ${date} ${month}, ${year}`;

let hours = now.getHours("#time-now");
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes("#time-now");
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let p = document.querySelector("#time-now");
let city = "Amsterdam";
p.innerHTML = `${hours}:${minutes}`;

function searchData(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city").value;
  let apiKey = "d4d65b2d65c67ac793e30f32ff741c0b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateInformation);
}

function provideInformation(response) {
  let city = response.data.name;
  let h1 = document.querySelector("#top-city");
  let condition = document.querySelector("#current-state");
  let nowCondition = response.data.weather[0].main;
  let nowHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#current-humidity");
  let nowWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#current-wind");
  let iconElement = document.querySelector("#weather-icon");

  celsiusTemperature = response.data.main.temp;

  h1.innerHTML = `${city}`;
  h3.innerHTML = `${temperature}°`;
  condition.innerHTML = `${nowCondition}`;
  humidity.innerHTML = `${nowHumidity}%`;
  wind.innerHTML = `${nowWind}km/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//SEARCH CITY ENGINE

let result = document.querySelector("#search-city-form");
result.addEventListener("submit", searchData);

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "d4d65b2d65c67ac793e30f32ff741c0b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function updateInformation(response) {
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  let h3 = document.querySelector("#current-temperature");
  let condition = document.querySelector("#current-state");
  let nowCondition = response.data.weather[0].main;
  let nowHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#current-humidity");
  let nowWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#current-wind");
  let iconElement = document.querySelector("#weather-icon");

  celsiusTemperature = response.data.main.temp;

  h1.innerHTML = `${city}`;
  h3.innerHTML = `${temperature}°`;
  condition.innerHTML = `${nowCondition}`;
  humidity.innerHTML = `${nowHumidity}%`;
  wind.innerHTML = `${nowWind}km/h`;
  h3 = Math.round(response.data.main.temp);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

//ICON

//C & F

function showCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let h3 = document.querySelector("#current-temperature");
  h3.innerHTML = `${Math.round(celsiusTemperature)}°`;
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let h3 = document.querySelector("#current-temperature");
  h3.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusTemperature = null;

//Week forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col forecast-col-1">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <br />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temp.max
          )}°</span>/
          <span class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temp.min
          )}°</span>
        </div>
        <br />
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />  
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

//SHOW MY LOCATION

function showLocation(position) {
  let apiKey = "d4d65b2d65c67ac793e30f32ff741c0b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(updateInformation);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentLocation);
