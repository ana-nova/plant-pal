import styled from "styled-components";
import PlantCard from "./PlantCard";

export default function PlantList({ plants, toggleFavourite }) {
  if (!plants || plants.length === 0) return <p>No plants found</p>;

  return (
    <main>
      <StyledList>
        {plants.map((plant) => (
          <li key={plant.id}>
            <PlantCard plant={plant} toggleFavourite={toggleFavourite} />
          </li>
        ))}
      </StyledList>
    </main>
  );
}

const StyledList = styled.ul`
  list-style: none;
`;
