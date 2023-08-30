let now = new Date();
let date = now.getDate();
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
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentLocationDate = document.querySelector("#date");
currentLocationDate.innerHTML = `${day} ${date}th ${month} ${hour}:${minutes}`;

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let currentDate = date.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  return `${day} ${currentDate}th ${month} ${hours}:${minutes}`;
}
function displayCurrentLocationForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="forecast-day">${formatForecastDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt="#"
                  width="80px"
                />
                <div class="forecast-temperature">
                  <span class="forecast-maximum-temperature">${Math.round(
                    forecastDay.temp.max
                  )}°C</span>/
                  <span class="forecast-minimum-temperature">${Math.round(
                    forecastDay.temp.min
                  )}°C</span>
                </div>
              </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
function getCurrentLocationForecast(coordinates) {
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayCurrentLocationForecast);
}

function displayBackground(description) {
  console.log(description);
  let backgroundVideo = document.querySelector("video");
  if (description === "Rain") {
    backgroundVideo.setAttribute("src", "src/videos/rain.mp4");
  } else if (description === "Drizzle") {
    backgroundVideo.setAttribute("src", "src/videos/rain.mp4");
  } else if (description === "Thunderstorm") {
    backgroundVideo.setAttribute("src", "src/videos/thunder.mp4");
  } else if (description === "Clear") {
    backgroundVideo.setAttribute("src", "src/videos/sunny.mp4");
  } else if (description === "Clouds") {
    backgroundVideo.setAttribute("src", "src/videos/sunny-and-cloudy.mp4");
  } else if (description === "Snow") {
    backgroundVideo.setAttribute("src", "src/videos/snow.mp4");
  } else {
    backgroundVideo.setAttribute("src", "src/videos/sunny.mp4");
  }
}

function displayCurrentBackground(description) {
  console.log(description);
  console.log(description === "Clouds");
  let backgroundVideo = document.querySelector("video");
  if (description === "Rain") {
    backgroundVideo.setAttribute("src", "src/videos/rain.mp4");
  } else if (description === "Drizzle") {
    backgroundVideo.setAttribute("src", "src/videos/rain.mp4");
  } else if (description === "Thunderstorm") {
    backgroundVideo.setAttribute("src", "src/videos/thunder.mp4");
  } else if (description === "Clear") {
    backgroundVideo.setAttribute("src", "src/videos/sunny.mp4");
  } else if (description === "Clouds") {
    backgroundVideo.setAttribute("src", "src/videos/sunny-and-cloudy.mp4");
  } else if (description === "Snow") {
    backgroundVideo.setAttribute("src", "src/videos/snow.mp4");
  } else {
    backgroundVideo.setAttribute("src", "src/videos/sunny.mp4");
  }
}
function showCurrentLocationTemperature(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temperature");
  let currentLocation = document.querySelector("#city");
  let currentCondition = document.querySelector("#description");
  let currentLocationHumidity = document.querySelector("#humidity");
  let currentLoctionWind = document.querySelector("#wind-speed");
  let currentLocationPressure = document.querySelector("#pressure");
  let currentLocationIcon = document.querySelector("#weather-icon");
  temperature.innerHTML = Math.round(response.data.main.temp);
  currentLocation.innerHTML = response.data.name;
  currentCondition.innerHTML = response.data.weather[0].description;
  currentLocationHumidity.innerHTML = response.data.main.humidity;
  currentLoctionWind.innerHTML = Math.round(response.data.wind.speed);
  currentLocationPressure.innerHTML = response.data.main.pressure;
  currentLocationIcon.setAttribute(
    "src",
    ` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getCurrentLocationForecast(response.data.coord);
  displayCurrentBackground(response.data.weather[0].main);
}

function showCurrentLocationData(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showCurrentLocationTemperature);
}

navigator.geolocation.getCurrentPosition(showCurrentLocationData);

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="forecast-day">${formatForecastDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt="#"
                  width="80px"
                />
                <div class="forecast-temperature">
                  <span class="forecast-maximum-temperature">${Math.round(
                    forecastDay.temp.max
                  )}°C</span>/
                  <span class="forecast-minimum-temperature">${Math.round(
                    forecastDay.temp.min
                  )}°C</span>
                </div>
              </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function formatSearchedLocationDate(timezone, sunrise) {
  console.log(timezone);
  console.log(sunrise);
  let now = new Date((sunrise + timezone) * 1000);
  let date = now.getDate();
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
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[now.getMonth()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentLocationDate = document.querySelector("#date");
  currentLocationDate.innerHTML = `${day} ${date}th ${month} ${hour}:${minutes}`;
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let pressureElement = document.querySelector("#pressure");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weather-icon");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  pressureElement.innerHTML = response.data.main.pressure;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    ` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
  formatSearchedLocationDate(response.data.timezone, response.data.sys.sunrise);
  displayBackground(response.data.weather[0].main);
}
function search(city) {
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#inputCity");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
