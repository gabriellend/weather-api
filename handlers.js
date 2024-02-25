import { get3DayForecast } from "./api.js";
import { displayForecast } from "./ui.js";

export async function handleLocationSearch(e) {
  e.preventDefault();

  const input = document.querySelector("#location");
  const location = input.value;
  const forecast = await get3DayForecast(location);
  if (forecast.error) {
    alert(forecast.error.message);
    console.log(forecast.error);
    return;
  }

  displayForecast(forecast);
}
