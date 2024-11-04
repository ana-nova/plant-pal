import styled from "styled-components";
import PlantCard from "./PlantCard";
import { useState } from "react";
import PlantForm from "./PlantForm";

export default function PlantList({ plants, toggleFavourite, onSubmitPlant }) {
  const [isAddible, setIsAddable] = useState(false);

  if (!plants || plants.length === 0) return <p>No plants found</p>;
  // const addPlant = () => {
  //   setIsAddible(!isAddible);
  // };
  return (
    <div>
      <StyledHeader>My Plants Collection</StyledHeader>
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
    </div>
  );
}

// {!isEditing ? ( <button onclick={addPlant}>Add</button> ) : ( <PlaForm> )}

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
