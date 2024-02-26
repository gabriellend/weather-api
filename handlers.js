import { get3DayForecast } from "./api.js";
import {
  displayForecast,
  displayCelcius,
  displayFarenheit,
  showLoadingOverlay,
  hideLoadingOverlay,
} from "./ui.js";

export async function handleLocationSearch(e) {
  e.preventDefault();
  showLoadingOverlay();

  const input = document.querySelector("#location");
  const location = input.value;
  const forecast = await get3DayForecast(location);
  if (forecast.error) {
    hideLoadingOverlay();
    alert(forecast.error.message);
    console.log(forecast.error);
    return;
  }

  displayForecast(forecast);
  hideLoadingOverlay();
}

export function handleTempConversion(e) {
  const unit = e.target.value;
  switch (unit) {
    case "farenheit":
      displayFarenheit();
      break;
    case "celcius":
      displayCelcius();
      break;
  }
}
