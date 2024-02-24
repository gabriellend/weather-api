const BASE_URL = "http://api.weatherapi.com/v1";
const API_KEY = "";

const forecastDisplayArea = document.querySelector("#forecast");
const form = document.querySelector("form");

async function get3DayForecast(location) {
  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=3`
  );
  if (!response.ok) {
    console.error("Failed to fetch data:", response.statusText);
    return;
  }

  const data = await response.json();
  const filteredData = filterData(data);
  return filteredData;
}

function filterData(data) {
  const { name, region } = data.location;
  const filteredData = {
    location: {
      name,
      region,
    },
    forecast: [],
  };

  data.forecast.forecastday.forEach((day) => {
    const dayObj = {
      date: formatDate(day.date),
      high: {
        farenheit: formatTemp(day.day.maxtemp_f, "°F"),
        celcius: formatTemp(day.day.maxtemp_c, "°C"),
      },
      low: {
        farenheit: formatTemp(day.day.mintemp_f, "°F"),
        celcius: formatTemp(day.day.mintemp_c, "°C"),
      },
      condition: day.day.condition.text,
      icon: day.day.condition.icon,
    };

    filteredData.forecast.push(dayObj);
  });

  return filteredData;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

function formatTemp(temp, suffix) {
  return `${temp}${suffix}`;
}

async function handleLocationSearch(e) {
  e.preventDefault();

  const input = document.querySelector("#location");
  const location = input.value;
  const forecast = await get3DayForecast(location);

  displayForecast(forecast);
}
function displayForecast(forecastData) {
  forecastDisplayArea.innerHTML = "";

  const locationName = document.createElement("h2");
  locationName.innerText = `${forecastData.location.name}, ${forecastData.location.region}`;
  locationName.id = "locationName";

  const forecastInfo = document.createElement("div");
  forecastInfo.id = "forecastInfo";

  forecastData.forecast.forEach((day) => {
    const dayInfo = document.createElement("div");
    dayInfo.classList.add("day");

    const date = document.createElement("h3");
    date.innerText = day.date;
    const high = document.createElement("h4");
    high.innerText = day.high.farenheit;
    const low = document.createElement("h4");
    low.innerText = day.low.farenheit;
    const icon = new Image();
    icon.src = `https://${day.icon}`;
    const condition = document.createElement("p");
    condition.innerText = day.condition;

    dayInfo.append(date, high, low, icon, condition);
    forecastInfo.append(dayInfo);
  });

  const radioBtns = document.querySelector("#radio");
  radioBtns.style.display = "block";
  forecastDisplayArea.append(locationName, forecastInfo);
}

form.addEventListener("submit", handleLocationSearch);
