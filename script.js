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
  let feelsLike = Math.round(response.data.main.feels_like);

  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;

  let temperatureElement = document.querySelector("#temperatureCard1");
  let descriptionElementCard1 = document.querySelector("#descriptionCard1");
  let humidityElementCard1 = document.querySelector("#humidityCard1");
  let countryElementCards1 = document.querySelectorAll(".countryCard1");
  let iconElementCard1 = document.querySelector("#iconCard1");
  let windElementCard1 = document.querySelector("#windCard1");
  let timeCards1 = document.querySelectorAll(".timeCard1");
  let feelsLikeCard1 = document.querySelector("#feelsLikeCard1");

  temperatureElement.innerHTML = temperature;
  descriptionElementCard1.innerHTML = description;
  humidityElementCard1.innerHTML = humidity;
  iconElementCard1.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElementCard1.setAttribute("alt", response.data.weather[0].description);
  countryElementCards1.forEach(
    (countryCard1) => (countryCard1.innerHTML = getCountryName(country))
  );
  windElementCard1.innerHTML = wind;
  timeCards1.forEach(
    (timeCard1) => (timeCard1.innerHTML = formatUTCDate(time))
  );
  feelsLikeCard1.innerHTML = feelsLike;

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(forecast5days);
}

function forecast5days(response) {
  let day1 = formatShortDate(new Date(response.data.daily[1].dt * 1000));
  let day2 = formatShortDate(new Date(response.data.daily[2].dt * 1000));
  let day3 = formatShortDate(new Date(response.data.daily[3].dt * 1000));
  let temp1 = Math.round(response.data.daily[1].temp.day);
  let temp2 = Math.round(response.data.daily[2].temp.day);
  let temp3 = Math.round(response.data.daily[3].temp.day);
  let feels1 = Math.round(response.data.daily[1].feels_like.day);
  let feels2 = Math.round(response.data.daily[2].feels_like.day);
  let feels3 = Math.round(response.data.daily[3].feels_like.day);
  let icon1 = response.data.daily[1].weather[0].icon;
  let icon2 = response.data.daily[2].weather[0].icon;
  let icon3 = response.data.daily[3].weather[0].icon;
  let description1 = response.data.daily[1].weather[0].description;
  let description2 = response.data.daily[2].weather[0].description;
  let description3 = response.data.daily[3].weather[0].description;

  let day1Element = document.querySelector("#day1");
  let day2Element = document.querySelector("#day2");
  let day3Element = document.querySelector("#day3");
  let temp1Element = document.querySelector("#temp1");
  let temp2Element = document.querySelector("#temp2");
  let temp3Element = document.querySelector("#temp3");
  let feels1Element = document.querySelector("#feels1");
  let feels2Element = document.querySelector("#feels2");
  let feels3Element = document.querySelector("#feels3");
  let icon1Element = document.querySelector("#icon1");
  let icon2Element = document.querySelector("#icon2");
  let icon3Element = document.querySelector("#icon3");

  day1Element.innerHTML = day1;
  day2Element.innerHTML = day2;
  day3Element.innerHTML = day3;
  temp1Element.innerHTML = temp1;
  temp2Element.innerHTML = temp2;
  temp3Element.innerHTML = temp3;
  feels1Element.innerHTML = feels1;
  feels2Element.innerHTML = feels2;
  feels3Element.innerHTML = feels3;

  icon1Element.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon1}.png`
  );
  icon1Element.setAttribute("alt", description1);
  icon2Element.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon2}.png`
  );
  icon2Element.setAttribute("alt", description2);
  icon3Element.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon3}.png`
  );
  icon3Element.setAttribute("alt", description3);
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

let buttonCard1 = document.querySelector("#buttonCard1");
buttonCard1.addEventListener("click", clickButtonCard1);
let closeCard1 = document.querySelector("#closeCard1");
closeCard1.addEventListener("click", clickCloseCard1);
let buttonCard2 = document.querySelector("#buttonCard2");
buttonCard2.addEventListener("click", clickButtonCard2);
let closeCard2 = document.querySelector("#closeCard2");
closeCard2.addEventListener("click", clickCloseCard2);
let buttonCard3 = document.querySelector("#buttonCard3");
buttonCard3.addEventListener("click", clickButtonCard3);
let closeCard3 = document.querySelector("#closeCard3");
closeCard3.addEventListener("click", clickCloseCard3);
let buttonCard4 = document.querySelector("#buttonCard4");
buttonCard4.addEventListener("click", clickButtonCard4);
let closeCard4 = document.querySelector("#closeCard4");
closeCard4.addEventListener("click", clickCloseCard4);
