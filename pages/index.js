import PlantList from "@/components/PlantList";
import Footer from "@/components/Footer";
import styled from "styled-components";

export default function Homepage({ plants, toggleFavourite }) {
  return (
    <main>
      <StyledHeader>My Plants Collection</StyledHeader>
      <PlantList plants={plants} toggleFavourite={toggleFavourite} />
    </main>
  );
}

const StyledHeader = styled.h1`
  display: flex;
  justify-content: center;
`;
