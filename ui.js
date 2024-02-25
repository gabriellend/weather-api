const forecastDisplayArea = document.querySelector("#forecast");
const radioBtns = document.querySelector("#radio");

export function displayForecast(forecastData) {
  // Clear the last forecast
  forecastDisplayArea.innerHTML = "";

  const locationName = createElement("h2", {
    innerText: `${forecastData.location.name}, ${forecastData.location.region}`,
    id: "locationName",
  });
  const forecastInfo = createElement("div", { id: "forecastInfo" });

  const dayElements = forecastData.forecast.map((day) => {
    const dayInfo = createElement("div", { className: "day" });

    const date = createElement("h3", { innerText: day.date });
    const high = createElement("h4", { innerText: day.high.farenheit });
    const low = createElement("h4", { innerText: day.low.farenheit });
    const icon = createElement("img", { src: `https://${day.icon}` });
    const condition = createElement("p", { innerText: day.condition });

    dayInfo.append(date, high, low, icon, condition);

    return dayInfo;
  });

  // Show radio buttons when we have a forecast
  radioBtns.style.display = "block";

  forecastInfo.append(...dayElements);
  forecastDisplayArea.append(locationName, forecastInfo);
}

function createElement(elem, options) {
  const element = document.createElement(elem);
  const { innerText, className, id, src } = options;

  if (innerText) {
    element.innerText = innerText;
  }
  if (className) {
    element.classList.add(className);
  }
  if (id) {
    element.id = id;
  }
  if (src) {
    element.src = src;
  }

  return element;
}