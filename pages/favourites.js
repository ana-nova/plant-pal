import PlantList from "@/components/PlantList";
import styled from "styled-components";
import useSWR from "swr";
import WeatherModal from "@/components/WeatherAlertpopup";
import { useState } from "react";

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

  const shouldShowWeatherAlert = weatherData?.weathercode !== undefined;

  function openWeatherAlertModal() {
    setIsModalOpen(true);
  }

  function closeWeatherAlertModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <h1>My Owned Plants</h1>

      {favouritePlants.length > 0 ? (
        <>
          <PlantList
            plants={favouritePlants}
            toggleFavourite={toggleFavourite}
            reminders={reminders}
            openWeatherAlertModal={openWeatherAlertModal}
            showWeatherAlert={shouldShowWeatherAlert}
            code={weatherData.weathercode}
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
