function getWeatherDescription(code) {
  const weatherDescriptions = {
    80: "Light rain showers, a soft drink for your plants—cheers!",
    3: "Overcast, the sky's blanket keeps your plants cool and calm.",
    55: "Heavy drizzle, nature's gentle watering.",
    56: "Light freezing drizzle, bring plants inside!",
    57: "Heavy freezing drizzle, your plants need shelter!",
    65: "Heavy rain, let nature do the watering.",
    67: "Freezing rain, protect your plants from frostbite!",
    75: "Heavy snow, your plants want a cozy spot.",
    77: "Snow grains, tiny ice for your plants!",
    82: "Heavy rain showers, umbrella for you, rest for your plants.",
    86: "Heavy snow showers, plants say, 'Nope, not today!'",
    95: "Thunderstorm, plants prefer to sit this one out.",
    96: "Thunder with light hail, plants need a safety net!",
    99: "Thunder with heavy hail, plants are screaming 'HELP!'",
  };

  return weatherDescriptions[code] || "";
}

function getAllWeatherDescription(code) {
  const weatherDescriptions = {
    0: "Clear sky",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Heavy drizzle",
    56: "Light freezing drizzle",
    57: "Heavy freezing drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Light snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",
    77: "Snow grains",
    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Heavy rain showers",
    85: "Light snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with light hail",
    99: "Thunderstorm with heavy hail",
  };
  return weatherDescriptions[code] || "Unknown conditions";
}

export { getWeatherDescription, getAllWeatherDescription };
