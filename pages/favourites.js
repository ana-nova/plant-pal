import PlantList from "@/components/PlantList";
import styled from "styled-components";
import useSWR from "swr";
import WeatherIcon from "@/components/WeatherIcon";
import WeatherModal from "@/components/WeatherAlertpopup";
import { useState } from "react";

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
export default function MyPlantsPage({
  toggleFavourite,
  reminders,
  weatherData,
}) {
  const { data: plants } = useSWR("/api/plants");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const favouritePlants = Array.isArray(plants)
    ? plants.filter((plant) => plant.isFavourite)
    : [];

  const allowedWeatherCodes = [
    3, 55, 56, 57, 65, 67, 75, 77, 82, 86, 95, 96, 99,
  ];

  const shouldShowWeatherAlert =
    weatherData?.weathercode !== undefined &&
    allowedWeatherCodes.includes(Number(weatherData.weathercode));

  function openWeatherAlertModal() {
    setIsModalOpen(true);
  }

  function closeWeatherAlertModal() {
    setIsModalOpen(false);
  }
  return (
    <>
      <h1>My Owned Plants</h1>
      {shouldShowWeatherAlert && (
        <button onClick={openWeatherAlertModal}>Show Weather Alert</button>
      )}
      {favouritePlants.length > 0 ? (
        <>
          <PlantList
            plants={favouritePlants}
            toggleFavourite={toggleFavourite}
            reminders={reminders}
            openWeatherAlertModal={openWeatherAlertModal}
            showWeatherAlert={shouldShowWeatherAlert}
          />
          {isModalOpen && (
            <WeatherModal
              onClose={closeWeatherAlertModal}
              code={weatherData.weathercode}
            />
          )}
        </>
      ) : (
        <StyledCard>
          Looks like you have not added any favorite plants yet! Start selecting
          some to see them here.
        </StyledCard>
      )}
    </>
  );
}

const StyledCard = styled.article`
  padding: 10px 10px 30px;
  margin: 20px 38px 23px 35px;
`;
