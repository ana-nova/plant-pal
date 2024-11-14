import { useState } from "react";
import PlantForm from "@/components/PlantForm";
import PlantList from "@/components/PlantList";
import SearchPlant from "@/components/SearchPlant";
import styled from "styled-components";

export default function Homepage({
  plants,
  toggleFavourite,
  onAddPlant,
  reminders,
}) {
  const [showForm, setShowForm] = useState(false);
  const [filteredPlants, setFilteredPlants] = useState(plants);

  function handleToggleForm() {
    setShowForm(!showForm);
  }

  return (
    <>
      <ButtonContainer>
        <ButtonAdd onClick={handleToggleForm}>
          {showForm ? "Hide form" : "Add new plant"}
        </ButtonAdd>
      </ButtonContainer>

      {showForm && (
        <PlantForm onSubmitPlant={onAddPlant} onToggleForm={handleToggleForm} />
      )}

      <SearchPlant plants={plants} setFilteredPlants={setFilteredPlants} />

      {filteredPlants.length > 0 ? (
        <PlantList
          plants={filteredPlants}
          toggleFavourite={toggleFavourite}
          reminders={reminders}
        />
      ) : (
        <p>No plants found for the selected filter.</p>
      )}
    </>
  );
}

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
