import styled from "styled-components";
import PlantCard from "./PlantCard";
import PlantForm from "./PlantForm";
import { useState } from "react";

export default function PlantList({
  plants,
  toggleFavourite,
  onSubmitPlant,
  showForm,
}) {
  if (!plants || plants.length === 0) return <p>No plants found</p>;

  return (
    <>
      {showForm && <PlantForm onSubmitPlant={onSubmitPlant} />}
      <StyledList>
        {plants.map((plant) => (
          <li key={plant.id}>
            <PlantCard plant={plant} toggleFavourite={toggleFavourite} />
          </li>
        ))}
      </StyledList>
    </>
  );
}

const StyledList = styled.ul`
  list-style: none;
`;
