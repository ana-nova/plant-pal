import Footer from "@/components/Footer";
import PlantList from "@/components/PlantList";
import styled from "styled-components";

export default function MyPlantsPage({ plants, toggleFavourite }) {
  const favouritePlants = plants
    ? plants.filter((plant) => plant.isFavourite)
    : [];

  return (
    <main>
      <StyledHeader>My Plants</StyledHeader>
      {favouritePlants.length > 0 ? (
        <PlantList plants={favouritePlants} toggleFavourite={toggleFavourite} />
      ) : (
        <>
          <StyledParagraph>
            No favourite plants found. Please select some favourite plants.
          </StyledParagraph>
        </>
      )}
      <Footer />
    </main>
  );
}

const StyledHeader = styled.h1`
  display: flex;
  justify-content: center;
`;

const StyledParagraph = styled.p`
  padding: 15px;
`;
