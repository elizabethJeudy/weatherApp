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

// get location input api
function showWeather(response) {
	console.log(response);
	let temperatureElement = document.querySelector(".temperature");
	temperatureElement.innerHTML = Math.round(response.data.main.temp);
	let descriptionElement = document.querySelector(".description");
	descriptionElement.innerHTML = `${response.data.weather[0].main}`;
	let feelsElement = document.querySelector("#feels-like");
	feelsElement.innerHTML = Math.round(response.data.main.feels_like);
}
