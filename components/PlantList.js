import styled from "styled-components";
import PlantCard from "./PlantCard";

export default function PlantList({
  plants,
  toggleFavourite,
  uploadedImageUrl,
}) {
  if (!plants || plants.length === 0) return <p>No plants found</p>;

  return (
    <StyledList>
      {plants.map((plant) => (
        <li key={plant.id}>
          <PlantCard
            plant={plant}
            toggleFavourite={toggleFavourite}
            uploadedImageUrl={uploadedImageUrl}
          />
        </li>
      ))}
    </StyledList>
  );
}

const StyledList = styled.ul`
  list-style: none;
`;
