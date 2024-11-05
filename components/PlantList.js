import styled from "styled-components";
import PlantCard from "./PlantCard";
import PlantForm from "./PlantForm";
import { useState } from "react";

export default function PlantList({ plants, toggleFavourite, onSubmitPlant }) {
  const [isAddible, setIsAddable] = useState(false);

  if (!plants || plants.length === 0) return <p>No plants found</p>;

  return (
    <>
      <StyledButton>
        <button onClick={() => setIsAddable((prev) => !prev)}>
          {isAddible ? "Hide form" : "Add new plant"}
        </button>
      </StyledButton>
      {isAddible && <PlantForm onSubmitPlant={onSubmitPlant} />}
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

const StyledHeader = styled.h1`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.p`
  display: flex;
  justify-content: center;
`;
