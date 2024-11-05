import PlantList from "@/components/PlantList";
import { useState } from "react";
import styled from "styled-components";

export default function Homepage({ plants, toggleFavourite, onSubmitPlant }) {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <StyledHeader>My Plants Collection</StyledHeader>
      <ButtonContainer>
        <button onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "Hide form" : "Add new plant"}
        </button>
      </ButtonContainer>
      <PlantList
        plants={plants}
        toggleFavourite={toggleFavourite}
        onSubmitPlant={onSubmitPlant}
        showForm={showForm}
      />
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
