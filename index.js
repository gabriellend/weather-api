const BASE_URL = "http://api.weatherapi.com/v1";
const API_KEY = "";

const forecastDisplayArea = document.querySelector("#forecast");
const form = document.querySelector("form");

async function get3DayForecast(location) {
  try {
  const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=3`,
      {
        mode: "cors",
      }
  );
  if (!response.ok) {
      const error = await response.json();
      throw error;
  }

  const data = await response.json();
  const filteredData = filterData(data);
  return filteredData;
  } catch (error) {
    return error;
  }
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
  if (forecast.error) {
    console.log(forecast.error);
    return;
  }

  displayForecast(forecast);
}

function createElement(elem, options) {
  const element = document.createElement(elem);
  const { innerText, className, id, src } = options;

  if (innerText) {
    elem.innerText = innerText;
  }
  if (className) {
    elem.classList.add(className);
  }
  if (id) {
    elem.id = id;
  }
  if (src) {
    elem.src = src;
  }

  return element;
}

function displayForecast(forecastData) {
  forecastDisplayArea.innerHTML = "";

  const locationName = createElement("h2", {
    innerText: `${forecastData.location.name}, ${forecastData.location.region}`,
    id: "locationName",
  });
  const forecastInfo = createElement("div", { id: "forecastInfo" });

  forecastData.forecast.forEach((day) => {
    const dayInfo = createElement("div", { className: "day" });

    const date = createElement("h3", { innerText: day.date });
    const high = createElement("h4", { innerText: day.high.farenheit });
    const low = createElement("h4", { innerText: day.low.farenheit });
    const icon = createElement("img", { src: `https://${day.icon}` });
    const condition = createElement("p", { innerText: day.condition });

    dayInfo.append(date, high, low, icon, condition);
    forecastInfo.append(dayInfo);
  });

  const radioBtns = document.querySelector("#radio");
  radioBtns.style.display = "block";
  forecastDisplayArea.append(locationName, forecastInfo);
}

form.addEventListener("submit", handleLocationSearch);
