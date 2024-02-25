export function filterData(data) {
  const { name, region } = data.location;

  const forecast = data.forecast.forecastday.map((day) => {
    const dayObj = {
      date: formatDate(day.date),
      high: formatTemp(day.day.maxtemp_f, "°F"),
      low: formatTemp(day.day.mintemp_f, "°F"),
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

export function formatTemp(temp, suffix) {
  return `${temp}${suffix}`;
}

export function convertTemp(temp, currentUnit) {
  switch (currentUnit) {
    case "C":
      return parseFloat((temp * (9 / 5) + 32).toFixed(1));
    case "F":
      return parseFloat(((temp - 32) * (5 / 9)).toFixed(1));
  }
}

export function stripSuffix(temp) {
  return Number(temp.replace(/[°CF]/g, ""));
}
