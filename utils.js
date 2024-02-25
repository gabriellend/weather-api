export function filterData(data) {
  const { name, region } = data.location;

  const forecast = data.forecast.forecastday.map((day) => {
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
    return dayObj;
  });

  return {
    location: {
      name,
      region,
    },
    forecast,
  };
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
