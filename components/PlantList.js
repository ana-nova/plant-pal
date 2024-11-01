import styled from "styled-components";
import PlantCard from "./PlantCard";

export default function PlantList({ plants, toggleFavourite }) {
  if (!plants || plants.length === 0) return <p>No plants found</p>;

  return (
    <div>
      <StyledHeader>My Plant Collection</StyledHeader>
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

const StyledList = styled.ul`
  list-style: none;
`;

const StyledHeader = styled.h1`
  display: flex;
  justify-content: center;
`;
