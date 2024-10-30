// Was macht diese Seite ?

import Image from "next/image";
import styled from "styled-components";
import { plants } from "@/assets/plants";
// Die component visualisiert eine card:

// PlantName: Aloe Vera#

// PlantBotanicalname: Aloe barbadensis miller

// Image:

// button:

export default function PlantCard({ plant }) {
  return (
    <Container>
      <h2>{plant.name}</h2>
      <StyledParagraph>{plant.botanicalName}</StyledParagraph>
      <RoundImage
        alt="image"
        src={plant.imageUrl}
        width={200}
        height={200}
      ></RoundImage>
    </Container>
  );
}

const RoundImage = styled.img`
  border-radius: 100px;
`;

const Container = styled.div`
  border: 2px solid black;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 23px;
  margin-right: 38px;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 15px; // Fügt gleichmäßigen Abstand zwischen den Elementen hinzu
  padding-bottom: 30px;
`;

const StyledParagraph = styled.p`
  margin: 5px;
`;
