import { plants } from "@/assets/plants";
import Image from "next/image";
import styled from "styled-components";
import PlantCard from "./PlantCard";
export default function PlantList() {
  return (
    <div>
      <h1>My Plant Collection</h1>
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
