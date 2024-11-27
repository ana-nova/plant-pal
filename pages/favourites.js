import PlantList from "@/components/PlantList";
import styled from "styled-components";
import useSWR from "swr";
import WeatherModal from "@/components/WeatherAlertpopup";
import { useState } from "react";
import PlantForm from "@/components/PlantForm";

export default function MyPlantsPage({
  toggleFavourite,
  reminders,
  weatherData,
}) {
  const { data: plants, mutate } = useSWR("/api/plants");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
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

  function handleToggleForm() {
    setShowForm(!showForm);
  }

  async function handleAddPlant(newPlantData) {
    try {
      const response = await fetch("/api/plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlantData),
      });

      if (!response.ok) {
        throw new Error("Failed to add the plant. Please try again.");
      }

      setShowForm(false);
      mutate();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <>
      <h1>My Owned Plants</h1>

      <ButtonContainer>
        <ButtonAdd onClick={handleToggleForm}>
          {showForm ? "Hide form" : "Add new plant"}
        </ButtonAdd>
      </ButtonContainer>

      {showForm && (
        <PlantForm
          onSubmitPlant={handleAddPlant}
          onToggleForm={handleToggleForm}
        />
      )}

      {favouritePlants.length > 0 ? (
        <>
          <PlantList
            plants={favouritePlants}
            toggleFavourite={toggleFavourite}
            reminders={reminders}
            openWeatherAlertModal={openWeatherAlertModal}
            showWeatherAlert={shouldShowWeatherAlert}
            code={weatherData?.weathercode}
          />
          {isModalOpen && (
            <WeatherModal
              onClose={closeWeatherAlertModal}
              code={weatherData?.weathercode}
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
  text-align: center;
`;

const ButtonAdd = styled.button`
  background-color: var(--color-button-add);

  &:hover {
    background-color: var(--color-button-add-hover);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
