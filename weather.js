function citySearch(event) {
	event.preventDefault();
	let cityInput = document.querySelector("#cityInput");
	let cityName = document.querySelector(".cityName");
	cityName.innerHTML = `${cityInput.value}`;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearch);
/*
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

// 
let hours = now.getHours();
if (hours < 10) {
	hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
	minutes = `0${minutes}`;
}
let currentTime = document.querySelectorAll(".currentDay");
currentTime.innerHTML = `${weekDay} ${hours}:${minutes}`;

// get current location weather with api and HTML change

function showWeather(response) {
	let temperatureElement = document.querySelector(".temperature");
	temperatureElement.innerHTML = Math.round(response.data.main.temp);

	let humidityElement = document.querySelector("#humidity")
	humidityElement.innerHTML = `${response.data.main.humidity}%`;

	let feelsElement = document.querySelector("#feels-like");
	feelsElement.innerHTML = Math.round(response.data.main.feels_like);

	let windElement = document.querySelector("#wind");
	windElement.innerHTML = Math.round(response.data.wind.speed);

	let descriptionElement = document.querySelector(".description");
	descriptionElement.innerHTML = `${response.data.weather[0].description}`;

	let iconElement = document.querySelector("#icon"); 	
	iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function getPosition(position) {
	let apiKey = "e8f1caf1080f26b2667bd09ad9d42c74";
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
	axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
navigator.geolocation.getCurrentPosition(getPosition);
/*
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
*/
