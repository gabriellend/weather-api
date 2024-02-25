import { handleLocationSearch, handleTempConverstion } from "./handlers.js";

const form = document.querySelector("form");
const radioBtns = document.querySelectorAll(".radioBtn");

form.addEventListener("submit", handleLocationSearch);
radioBtns.forEach((btn) =>
  btn.addEventListener("change", handleTempConverstion)
);
