let apiKey = "71f57c13bbcc4d290991410e3cd840b3";

// header - date Singapore

let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

function formatUTCDate(date) {
  let day = days[date.getUTCDay()];
  let hours = date.getUTCHours();
  let minutes = minutesTwoDigits(date.getUTCMinutes());
  let month = months[date.getUTCMonth()];
  let numDay = date.getUTCDate();
  let year = date.getUTCFullYear();
  let ampm;
  if (hours >= 12) {
    ampm = "PM";
  } else {
    ampm = "AM";
  }
  if (hours > 12) {
    hours = hours - 12;
  } else if (hours === 0) {
    hours = 12;
  }
  return `${day} ${month} ${numDay}, ${year} -
  ${hours}:${minutes}${ampm}`;
}

function formatDate(date) {
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = minutesTwoDigits(date.getMinutes());
  let month = months[date.getMonth()];
  let numDay = date.getDate();
  let year = date.getFullYear();
  let ampm;
  if (hours >= 12) {
    ampm = "PM";
  } else {
    ampm = "AM";
  }
  if (hours > 12) {
    hours = hours - 12;
  } else if (hours === 0) {
    hours = 12;
  }
  return `${day} ${month} ${numDay}, ${year} -
  ${hours}:${minutes}${ampm}`;
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
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let userLocation = response.data.name;

  let temperatureElementSin = document.querySelector(".temperatureSingapore");
  let descriptionElementSin = document.querySelector("#descriptionSingapore");
  let humidityElementSin = document.querySelector("#humiditySingapore");
  let iconElementSin = document.querySelector("#iconSingapore");
  let windElementSin = document.querySelector("#windSingapore");
  let userLocationElement = document.querySelector("#userLocation");

  temperatureElementSin.innerHTML = temperature;
  descriptionElementSin.innerHTML = description;
  humidityElementSin.innerHTML = humidity;
  iconElementSin.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElementSin.setAttribute("alt", response.data.weather[0].description);
  windElementSin.innerHTML = wind;
  userLocationElement.innerHTML = userLocation;
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

  let fahrenheitLink = document.querySelector(".fahrenheit");
  let celsiusLink = document.querySelector(".celsius");
  fahrenheitLink.classList.add("disabled");
  celsiusLink.classList.remove("disabled");
}

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", setFahrenheit);

function setCelsius(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector(".temperatureSingapore");
  let fahrenheit2 = fahrenheit.innerHTML;
  let celsius = converterFtoC(fahrenheit2);
  fahrenheit.innerHTML = celsius;

  let fahrenheitLink = document.querySelector(".fahrenheit");
  let celsiusLink = document.querySelector(".celsius");
  fahrenheitLink.classList.remove("disabled");
  celsiusLink.classList.add("disabled");
}

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", setCelsius);

// block history 1

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let country = response.data.sys.country;
  let wind = Math.round(response.data.wind.speed);
  let time = new Date(response.data.dt * 1000 + response.data.timezone * 1000);

  let temperatureElement = document.querySelector("#temperatureCard1");
  let descriptionElementCard1 = document.querySelector("#descriptionCard1");
  let humidityElementCard1 = document.querySelector("#humidityCard1");
  let countryElementCard1 = document.querySelector("#countryCard1");
  let iconElementCard1 = document.querySelector("#iconCard1");
  let windElementCard1 = document.querySelector("#windCard1");
  let timeCard1 = document.querySelector("#timeCard1");

  temperatureElement.innerHTML = temperature;
  descriptionElementCard1.innerHTML = description;
  humidityElementCard1.innerHTML = humidity;
  iconElementCard1.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElementCard1.setAttribute("alt", response.data.weather[0].description);
  countryElementCard1.innerHTML = getCountryName(country);
  windElementCard1.innerHTML = wind;
  timeCard1.innerHTML = formatUTCDate(time);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
  axios
    .get(`${apiUrl}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    .then(temperatureSingapore);
}

function error() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Singapore&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(temperatureSingapore);
}

navigator.geolocation.getCurrentPosition(handlePosition, error);
