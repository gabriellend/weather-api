import { handleLocationSearch } from "./handlers.js";

const form = document.querySelector("form");

form.addEventListener("submit", handleLocationSearch);
