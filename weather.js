// current month, day and time will update
let now = new Date();
let week = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let weekDay = week[now.getDay()];

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
	"Decemeber",
];
let month = months[now.getMonth()];

let date = now.getDate();

let hours = now.getHours();
if (hours < 10) {
	hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
	minutes = `0${minutes}`;
}

let currentDay = document.querySelector(".currentDay");
currentDay.innerHTML = `${weekDay}, ${month} ${date}`;

let currentTime = document.querySelector(".currentTime");
currentTime.innerHTML = `${hours}:${minutes}`;

// search city input will change h1
function citySearch(event) {
	event.preventDefault();
	let cityInput = document.querySelector("#city-input");
	let cityName = document.querySelector(".cityName");
	cityName.innerHTML = `${cityInput.value}`;
	let city = `${cityInput.value}`;
	let apiKey = "e8f1caf1080f26b2667bd09ad9d42c74";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
	axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearch);

// retrieves daily forecast for city input and displays it
function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	return days[day];
}

function showForecast(response) {
	console.log(response);
	let forecast = response.data.daily;
	let forecastElement = document.querySelector("#forecast");
	let forecastHTML = `<div class="row">`;

	forecast.forEach(function (forecast, index) {
		if (index < 6) {
			forecastHTML =
				forecastHTML +
				`
								<div class="col-2">
									<div class="forecastDate">${formatDay(forecast.dt)}</div>
									<img src="https://openweathermap.org/img/wn/${
										forecast.weather[0].icon
									}@2x.png" alt="" />
									<div class="forecastTemperature">
										<span class="temperatureMax"> ${Math.round(forecast.temp.max)}º |</span>
										<span class="temperatureMin"> ${Math.round(forecast.temp.min)}º</span>
									</div>
									<div class="forecastDescription">${forecast.weather[0].description}</div>
								</div>
			 `;
		}
	});
	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
	let apiKey = "e8f1caf1080f26b2667bd09ad9d42c74";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(showForecast);
}

// get location input api
function showWeather(response) {
	let cityName = document.querySelector(".cityName");
	cityName.innerHTML = response.data.name;
	let temperatureElement = document.querySelector(".temperature");
	temperatureElement.innerHTML = Math.round(response.data.main.temp);
	let descriptionElement = document.querySelector(".description");
	descriptionElement.innerHTML = `${response.data.weather[0].main}`;
	let feelsElement = document.querySelector("#feels-like");
	feelsElement.innerHTML = Math.round(response.data.main.feels_like);
	let humidityElement = document.querySelector("#humidity");
	humidityElement.innerHTML = `${response.data.main.humidity}%`;
	let windElement = document.querySelector("#wind");
	windElement.innerHTML = Math.round(response.data.wind.speed);
	let iconElement = document.querySelector("#icon");
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
	);
	iconElement.setAttribute("alt", response.data.weather[0].description);
	getForecast(response.data.coord);
}

// get current location api

function getPosition(position) {
	let apiKey = "e8f1caf1080f26b2667bd09ad9d42c74";
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
	axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function getCurrentPosition(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(getPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);
