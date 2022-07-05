// search city with api, city input will appear in HTML h1
function citySearch(event) {
	event.preventDefault();
	let cityInput = document.querySelector("#cityInput");
	let cityName = document.querySelector(".cityName");
	cityName.innerHTML = `${cityInput.value}`;
	let apiKey = "e8f1caf1080f26b2667bd09ad9d42c74";
	let city = `${cityInput.value}`;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
	axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);

// HTML change to current day of the week and time
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

let hours = now.getHours();
if (hours < 10) {
	hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
	minutes = `0${minutes}`;
}
document.querySelector(
	".currentDay"
).innerHTML = `${weekDay} ${hours} : ${minutes}`;

// get current location weather with api and HTML change

function showWeather(response) {
	document.querySelector(".temperature").innerHTML = Math.round(
		response.data.main.temp
	);
	document.querySelector(
		"#humidity"
	).innerHTML = `${response.data.main.humidity}%`;
	document.querySelector("#feels-like").innerHTML = Math.round(
		response.data.main.feels_like
	);

	document.querySelector("#wind").innerHTML = Math.round(
		response.data.wind.speed
	);

	document.querySelector(
		".weatherDescription"
	).innerHTML = `${response.data.weather[0].description}`;
}

function getPosition(position) {
	let apiKey = "e8f1caf1080f26b2667bd09ad9d42c74";
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
	axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
navigator.geolocation.getCurrentPosition(getPosition);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//temperature conversions
/*
function convertToFahrenheit(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector(".temperature");
	let temperature = temperatureElement.innerHTML;
	temperatureElement.innerHTML = Math.round(temperature);
}

function convertToCelsius(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector(".temperature");
	let temperature = temperatureElement.innerHTML;
	temperatureElement.innerHTML = Math.round((14 * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector(".fahrenheitTemperature");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector(".celsiusTemperature");
celsiusLink.addEventListener("click", convertToCelsius);
*/
