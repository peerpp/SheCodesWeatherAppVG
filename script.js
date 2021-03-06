let apiKey = "71f57c13bbcc4d290991410e3cd840b3";

let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

function minutesTwoDigits(minutes) {
  if (minutes < 10) {
    return `0${minutes}`;
  } else {
    return minutes;
  }
}

function formatShortDate(date) {
  let day = days[date.getUTCDay()];
  let month = months[date.getUTCMonth()];
  let numDay = date.getUTCDate();
  return `${day} ${month} ${numDay}`;
}

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
  return `Last updated: ${day} ${month} ${numDay}, ${year} <i class="far fa-clock"></i>
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
  return `${day} ${month} ${numDay}, ${year} <i class="far fa-clock"></i>
  ${hours}:${minutes}${ampm}`;
}

let element = document.querySelector(".timeSingapore");
element.innerHTML = formatDate(now);

// header form input City

function displayCity(event) {
  event.preventDefault();
  let inputLocation = document
    .querySelector("#inputDestination")
    .value.trim()
    .toLowerCase();

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&units=metric`;
  axios
    .get(`${apiUrl}&appid=${apiKey}`)
    .then(showTemperature)
    .catch(
      (err) =>
        (document.querySelector("#inputDestination").value = "Not found!")
    );
}

let formCity = document.querySelector("form");
formCity.addEventListener("submit", displayCity);

// header temperature Singapore

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Singapore&units=metric`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(temperatureSingapore);

function temperatureSingapore(response) {
  let temperatureElementSin = document.querySelector(".temperatureSingapore");
  let descriptionElementSin = document.querySelector("#descriptionSingapore");
  let humidityElementSin = document.querySelector("#humiditySingapore");
  let iconElementSin = document.querySelector("#iconSingapore");
  let windElementSin = document.querySelector("#windSingapore");
  let userLocationElement = document.querySelector("#userLocation");

  temperatureElementSin.innerHTML = Math.round(response.data.main.temp);
  descriptionElementSin.innerHTML = response.data.weather[0].description;
  humidityElementSin.innerHTML = response.data.main.humidity;
  iconElementSin.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElementSin.setAttribute("alt", response.data.weather[0].description);
  windElementSin.innerHTML = Math.round(response.data.wind.speed);
  userLocationElement.innerHTML = response.data.name;
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

function rotateCards() {
  document.querySelector("#flipCard4").innerHTML = document.querySelector(
    "#flipCard3"
  ).innerHTML;
  document.querySelector("#flipCard3").innerHTML = document.querySelector(
    "#flipCard2"
  ).innerHTML;
  document.querySelector("#flipCard2").innerHTML = document.querySelector(
    "#flipCard1"
  ).innerHTML;

  document.querySelector("#flipCard4").classList = document.querySelector(
    "#flipCard3"
  ).classList;
  document.querySelector("#flipCard3").classList = document.querySelector(
    "#flipCard2"
  ).classList;
  document.querySelector("#flipCard2").classList = document.querySelector(
    "#flipCard1"
  ).classList;

  document.querySelector("#flipCard1").classList.remove("flip");

  addEventListeners();
}

function showTemperature(response) {
  rotateCards();

  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let country = response.data.sys.country;
  let wind = Math.round(response.data.wind.speed);
  let time = new Date(response.data.dt * 1000 + response.data.timezone * 1000);
  let feelsLike = Math.round(response.data.main.feels_like);
  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  let inputLocation = document
    .querySelector("#inputDestination")
    .value.trim()
    .toLowerCase();

  let temperatureElement = document.querySelector(
    "#flipCard1 .temperatureFront"
  );
  let descriptionElementCard1 = document.querySelector(
    "#flipCard1 .descriptionCard"
  );
  let humidityElementCard1 = document.querySelector("#flipCard1 .humidityCard");
  let windElementCard1 = document.querySelector("#flipCard1 .windCard");
  let timeCards1 = document.querySelectorAll("#flipCard1 .timeCard");
  let feelsLikeCard1 = document.querySelector("#flipCard1 .feelsLikeCard");
  let formCities = document.querySelectorAll("#flipCard1 .cityCountryCard");
  let searchIconCard1 = document.querySelector("#flipCard1 .searchIcon");
  let buttonCard1 = document.querySelector("#flipCard1 .btn-forecast");

  formCities.forEach(
    (formCity) =>
      (formCity.innerHTML = `${inputLocation}, ${getCountryName(country)}`)
  );
  temperatureElement.innerHTML = `${temperature}°C &mdash;`;
  descriptionElementCard1.innerHTML = description;
  humidityElementCard1.innerHTML = `Humidity: ${humidity}%`;
  searchIconCard1.innerHTML = `<img class="iconCardFront" src="https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png" alt="${response.data.weather[0].description}"/>`;
  windElementCard1.innerHTML = `Wind: ${wind} km/h`;
  timeCards1.forEach(
    (timeCard1) => (timeCard1.innerHTML = formatUTCDate(time))
  );
  feelsLikeCard1.innerHTML = `Feels like: ${feelsLike}°C`;
  buttonCard1.classList.remove("btn-forecast-hidden");

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(forecast3days);
}

function forecast3days(response) {
  let day1Element = document.querySelector("#flipCard1 .day1");
  let day2Element = document.querySelector("#flipCard1 .day2");
  let day3Element = document.querySelector("#flipCard1 .day3");
  let temp1Element = document.querySelector("#flipCard1 .temp1");
  let temp2Element = document.querySelector("#flipCard1 .temp2");
  let temp3Element = document.querySelector("#flipCard1 .temp3");
  let feels1Element = document.querySelector("#flipCard1 .feels1");
  let feels2Element = document.querySelector("#flipCard1 .feels2");
  let feels3Element = document.querySelector("#flipCard1 .feels3");
  let icon1Element = document.querySelector("#flipCard1 .icon1");
  let icon2Element = document.querySelector("#flipCard1 .icon2");
  let icon3Element = document.querySelector("#flipCard1 .icon3");

  day1Element.innerHTML = formatShortDate(
    new Date(response.data.daily[1].dt * 1000)
  );
  day2Element.innerHTML = formatShortDate(
    new Date(response.data.daily[2].dt * 1000)
  );
  day3Element.innerHTML = formatShortDate(
    new Date(response.data.daily[3].dt * 1000)
  );
  temp1Element.innerHTML = Math.round(response.data.daily[1].temp.day);
  temp2Element.innerHTML = Math.round(response.data.daily[2].temp.day);
  temp3Element.innerHTML = Math.round(response.data.daily[3].temp.day);
  feels1Element.innerHTML = Math.round(response.data.daily[1].feels_like.day);
  feels2Element.innerHTML = Math.round(response.data.daily[2].feels_like.day);
  feels3Element.innerHTML = Math.round(response.data.daily[3].feels_like.day);

  icon1Element.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.daily[1].weather[0].icon}.png`
  );
  icon1Element.setAttribute(
    "alt",
    response.data.daily[1].weather[0].description
  );
  icon2Element.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.daily[2].weather[0].icon}.png`
  );
  icon2Element.setAttribute(
    "alt",
    response.data.daily[2].weather[0].description
  );
  icon3Element.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.daily[3].weather[0].icon}.png`
  );
  icon3Element.setAttribute(
    "alt",
    response.data.daily[3].weather[0].description
  );
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

// flip buttons
function clickButtonCard1(event) {
  document.querySelector("#flipCard1").classList.add("flip");
}
function clickCloseCard1(event) {
  document.querySelector("#flipCard1").classList.remove("flip");
}
function clickButtonCard2(event) {
  document.querySelector("#flipCard2").classList.add("flip");
}
function clickCloseCard2(event) {
  document.querySelector("#flipCard2").classList.remove("flip");
}
function clickButtonCard3(event) {
  document.querySelector("#flipCard3").classList.add("flip");
}
function clickCloseCard3(event) {
  document.querySelector("#flipCard3").classList.remove("flip");
}
function clickButtonCard4(event) {
  document.querySelector("#flipCard4").classList.add("flip");
}
function clickCloseCard4(event) {
  document.querySelector("#flipCard4").classList.remove("flip");
}

function addEventListeners() {
  let buttonCard1 = document.querySelector("#flipCard1 .buttonCard");
  buttonCard1.addEventListener("click", clickButtonCard1);
  let closeCard1 = document.querySelector("#flipCard1 .closeCard");
  closeCard1.addEventListener("click", clickCloseCard1);
  let buttonCard2 = document.querySelector("#flipCard2 .buttonCard");
  buttonCard2.addEventListener("click", clickButtonCard2);
  let closeCard2 = document.querySelector("#flipCard2 .closeCard");
  closeCard2.addEventListener("click", clickCloseCard2);
  let buttonCard3 = document.querySelector("#flipCard3 .buttonCard");
  buttonCard3.addEventListener("click", clickButtonCard3);
  let closeCard3 = document.querySelector("#flipCard3 .closeCard");
  closeCard3.addEventListener("click", clickCloseCard3);
  let buttonCard4 = document.querySelector("#flipCard4 .buttonCard");
  buttonCard4.addEventListener("click", clickButtonCard4);
  let closeCard4 = document.querySelector("#flipCard4 .closeCard");
  closeCard4.addEventListener("click", clickCloseCard4);
}

addEventListeners();
