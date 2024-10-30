/* Was macht diese Seite?
- gibt eine Liste von allen Elementen in assets/plants.js wieder
- map + rendered alles in einer PlantCard wieder 
*/

import { plants } from "@/assets/plants";
import styled from "styled-components";
import PlantCard from "./PlantCard";

export default function PlantList() {
  return (
    <div>
      <StyledHeader>My Plant Collection</StyledHeader>
      <StyledList>
        {plants.map((plant) => (
          <li key={plant.id}>
            <PlantCard plant={plant} />
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
