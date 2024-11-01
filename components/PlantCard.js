import styled from "styled-components";
import PlantFavIcon from "@/public/Icons/plant-line.svg";
import PlantFavIconFill from "@/public/Icons/plant-fill.svg";

export default function PlantCard({ plant, onToggleFavourite }) {
  return (
    <Container>
      <button onClick={() => onToggleFavourite(plant.id)}>
        {plant.isFavourite ? <PlantFavIcon /> : <PlantFavIconFill />}
      </button>
      <h2>{plant.name}</h2>
      <StyledParagraph>{plant.botanicalName}</StyledParagraph>

      <RoundImage
        alt={`Image of ${plant.name}`}
        src={plant.imageUrl}
      ></RoundImage>

      <StyledLink href={`/${plant.id}`}>see more</StyledLink>
    </Container>
  );
}

const StyledLink = styled.a`
  border: 1px solid black;
  border-radius: 8px;
  background-color: lightgray;
  color: black;
  text-decoration: none;
  padding: 5px;
`;

const RoundImage = styled.img`
  border-radius: 100px;
  width: 200px;
  height: 200px;
`;

const Container = styled.article`
  border: 2px solid black;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px 10px 30px;
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
