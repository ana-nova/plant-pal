import HouseLine from "@/public/Icons/home-4-line.svg";
import styled from "styled-components";
import PlantFavIcon from "@/public/Icons/plant-line.svg";

export default function Footer() {
  return (
    <StyledFooter>
      <StyledLink href={"/"}>
        <HouseLine />
      </StyledLink>
      <StyledLink href={"/myPlants"}>
        <PlantFavIcon />
      </StyledLink>
    </StyledFooter>
  );
}

const StyledFooter = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: lightgray;
  padding: 10px;
  display: flex;
  justify-content: space-around;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
  flex-direction: column;
`;
