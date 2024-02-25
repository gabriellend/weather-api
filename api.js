import { filterData } from "./utils.js";

const BASE_URL = "http://api.weatherapi.com/v1";
const API_KEY = "";

export async function get3DayForecast(location) {
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
    const filteredForecastData = filterData(data);
    return filteredForecastData;
  } catch (error) {
    return error;
  }
}
