import { useRouter } from "next/router";
import HouseLine from "@/public/Icons/home-4-line.svg";
import HouseFill from "@/public/Icons/home-4-fill.svg";
import PlantLine from "@/public/Icons/plant-line.svg";
import PlantFill from "@/public/Icons/plant-fill.svg";
import Link from "next/link";
import styled from "styled-components";

export default function Footer() {
  const router = useRouter();

  return (
    <footer>
      <StyledLink href={"/"} aria-label="Go to homepage">
        {router.pathname === "/" ? <HouseFill /> : <HouseLine />}
      </StyledLink>
      <StyledLink href={"/favourites"} aria-label="Go to favourite plants">
        {router.pathname === "/favourites" ? <PlantFill /> : <PlantLine />}
      </StyledLink>
    </footer>
  );
}

const StyledLink = styled(Link)`
  color: var(--color-button-text);
`;
