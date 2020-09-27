let apiKey = "71f57c13bbcc4d290991410e3cd840b3";

// header - date Singapore

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

function minutesTwoDigits(minutes) {
  if (minutes < 10) {
    return `0${minutes}`;
  } else {
    return minutes;
  }
}

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(date) {
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = minutesTwoDigits(date.getMinutes());
  let month = months[date.getMonth()];
  let numDay = date.getDate();
  let year = date.getFullYear();
  return `${day} ${month} ${numDay} ${year}<br />
  ${hours}:${minutes}`;
}

let element = document.querySelector(".timeSingapore");
element.innerHTML = formatDate(now);

// header form input City

function displayCity(event) {
  event.preventDefault();
  let inputLocation = document.querySelector("#inputDestination").value.trim();

  let formCities = document.querySelectorAll(".card-title-card1");
  formCities.forEach((formCity) => (formCity.innerHTML = inputLocation));

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let formCity = document.querySelector("form");
formCity.addEventListener("submit", displayCity);

// header temperature Singapore

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Singapore&units=metric`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(temperatureSingapore);

function temperatureSingapore(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElementSin = document.querySelector(".temperatureSingapore");

  temperatureElementSin.innerHTML = `${temperature}`;
}

function converterCtoF(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

function converterFtoC(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

function setFahrenheit(event) {
  event.preventDefault();
  let celsius = document.querySelector(".temperatureSingapore");
  let celsius2 = celsius.innerHTML;
  let fahrenheit = converterCtoF(celsius2);
  celsius.innerHTML = fahrenheit;
}

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", setFahrenheit);

function setCelsius(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector(".temperatureSingapore");
  let fahrenheit2 = fahrenheit.innerHTML;
  let celsius = converterFtoC(fahrenheit2);
  fahrenheit.innerHTML = celsius;
}

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", setCelsius);

// block history 1

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperatureBlock1");

  temperatureElement.innerHTML = `${temperature}`;
}

// button homework week 5

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  axios
    .get(`${apiUrl}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    .then(showCurrentLocation);
}
function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getCurrentPosition);

function showCurrentLocation(response) {
  let temperature = Math.round(response.data.main.temp);
  let location = response.data.name;
  let tempLocationElement = document.querySelector("#buttonInsert");

  tempLocationElement.innerHTML = `It is ${temperature}°C in ${location}.`;
}
