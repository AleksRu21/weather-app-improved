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
h4.innerHTML = `It is ${day} ${date} ${month},${year}`;

let hours = now.getHours("#time-now");
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes("#time-now");
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let p = document.querySelector("#time-now");
p.innerHTML = `${hours}:${minutes}`;

//Search city
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
  h1.innerHTML = `${city}`;

  let temperature = Math.round(response.data.main.temp);
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${temperature}°C`;

  let condition = document.querySelector("#current-state");
  let nowCondition = response.data.weather[0].main;
  condition.innerHTML = `${nowCondition}`;

  let nowHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#current-humidity");
  humidity.innerHTML = `Humidity is ${nowHumidity}%`;

  let nowWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#current-wind");
  wind.innerHTML = `Wind is ${nowWind} km/h`;
}

function showFahrenheit(event) {
  let fahrenheit = document.querySelector("#fahrenheit-temp");
  let currentTemp = document.querySelector("h3");
  currentTemp.innerHTML = `${67}°`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-temp");
fahrenheitLink.addEventListener("click", showFahrenheit);

let result = document.querySelector("#search-city-form");
result.addEventListener("submit", searchData);

//Bonus - done
function updateInformation(response) {
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  let temperature = Math.round(response.data.main.temp);
  let h3 = document.querySelector("#current-temperature");
  h3.innerHTML = `${temperature}°C`;

  let condition = document.querySelector("#current-state");
  let nowCondition = response.data.weather[0].main;
  condition.innerHTML = `${nowCondition}`;

  let nowHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#current-humidity");
  humidity.innerHTML = `Humidity is ${nowHumidity}%`;

  let nowWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#current-wind");
  wind.innerHTML = `Wind is ${nowWind} km/h`;
}

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
