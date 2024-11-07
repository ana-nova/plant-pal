import PlantForm from "@/components/PlantForm";
import PlantList from "@/components/PlantList";

import { useState } from "react";
import styled from "styled-components";

export default function Homepage({ plants, toggleFavourite, onAddPlant }) {
  const [showForm, setShowForm] = useState(false);

  function handleToggleForm() {
    setShowForm((prev) => !prev);
  }
  return (
    <>
      <StyledHeader>Guardians of the Garden</StyledHeader>
      <ButtonContainer>
        <button onClick={handleToggleForm}>
          {showForm ? "Hide form" : "Add new plant"}
        </button>
      </ButtonContainer>
      {showForm && (
        <PlantForm onAddPlant={onAddPlant} onToggleForm={handleToggleForm} />
      )}

      <PlantList plants={plants} toggleFavourite={toggleFavourite} />
    </>
  );
}

const StyledHeader = styled.h1`
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
