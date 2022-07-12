// current day and time will update
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
	let cityInput = document.querySelector("#cityInput");
	let cityName = document.querySelector(".cityName");
	cityName.innerHTML = `${cityInput.value}`;
	let city = `${cityInput.value}`;
	let apiKey = "e8f1caf1080f26b2667bd09ad9d42c74";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
	axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearch);

function showForecast() {
	let forecastElement = document.querySelector("#forecast");
	forecastElement.innerHTML = `<div class="row">
							<div class="col-6">
								<div class="forecastDate">Monday</div>
								<img src="https://openweathermap.org/img/wn/02n@2x.png" alt="" />
								<div class="forecastTemperature">
									<span class="temperatureMax"> 96º |</span>
									<span class="temperatureMin"> 85º</span>
								</div>
								<div class="forecastDescription">Cloudy</div>
							</div>`;
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
	showForecast();
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

// temperature conversions

/*
function showCelciusTemperature(event) {
	event.preventDefault();
	let celciusTemperature = "(temperatureElement - 32) * 5) / 9";
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let fahrenheitTemperature = null;

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);
*/
