function formatDate(date) { 
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[date.getDay()];  
  let minutes = date.getMinutes();
  let hour = date.getHours();
  
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
  
}

function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temp");
  let temperature = response.data.temperature.current;
  let humidityElement = document.querySelector("#Humidity");
  let windElement = document.querySelector("#Wind");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#emoji");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let hour = date.getHours();
  
  
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="emoji" />`;
  descriptionElement.innerHTML = `${response.data.condition.description}`;
  windElement.innerHTML = `${response.data.wind.speed}`;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  getForecast(response.data.city);
}

function searchcity(city) {
  let apiKey = "60c3d936b5fef44at07f1bcc18a1ob97";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}


function SearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-Input");
  let cityElement = document.querySelector("#City");
  cityElement.innerHTML = searchInput.value;
  searchcity(searchInput.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
function getForecast(city){
let apiKey = "60c3d936b5fef44at07f1bcc18a1ob97";
let apiiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=imperial`;
axios(apiiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

let forecastHtml ="";

 
response.data.daily.forEach(function (day, index) {
  if (index < 5) {
  forecastHtml =
  forecastHtml +
       `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
        <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature">
          <strong>${Math.round(day.temperature.maximum)}°</strong>
        </div>
        <div calss="weather-forecast-temperature">${Math.round(day.temperature.maximum)}°</div>
        </div>
        </div>
        </div>
  `;
  }
});
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
  
}
let searchFormElement =  document.querySelector("#search-form");
searchFormElement.addEventListener("submit", SearchSubmit);
getForecast("Paris");








