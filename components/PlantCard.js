/* Was macht diese Seite ?
Die component visualisiert eine card:
- PlantName: Aloe Vera
- PlantBotanicalname: Aloe barbadensis miller
- Image mit imageUrl
- Button für "see more"
 */

import styled from "styled-components";
import Link from "next/link";

export default function PlantCard({ plant }) {
  return (
    <Container>
      <h2>{plant.name}</h2>
      <StyledParagraph>{plant.botanicalName}</StyledParagraph>
      <RoundImage alt="image" src={plant.imageUrl}></RoundImage>
      <Link href={`/plant/${plant.id}`}>
        <button type="button">see more</button>
      </Link>
    </Container>
  );
}

const RoundImage = styled.img`
  border-radius: 100px;
  width: 200px;
  height: 200px;
`;

const Container = styled.div`
  border: 2px solid black;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px 10px 30px; // Zusammengefasstes Padding
  margin-bottom: 23px;
  margin-right: 38px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const StyledParagraph = styled.p`
  margin: 5px;
`;
