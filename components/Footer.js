import HouseLine from "@/public/Icons/home-4-line.svg";
import styled from "styled-components";
import PlantFavIcon from "@/public/Icons/plant-line.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <StyledFooter>
      <StyledLink href={"/"} aria-label="Go to homepage">
        <HouseLine />
      </StyledLink>
      <StyledLink href={"/myPlants"} aria-label="Go to favourite plants">
        <PlantFavIcon />
      </StyledLink>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: lightgray;
  padding: 10px;
  display: flex;
  justify-content: space-around;
`;

const StyledLink = styled(Link)`
  color: black;
`;
