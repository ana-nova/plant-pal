import Footer from "@/components/Footer";
import PlantList from "@/components/PlantList";
import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";

export default function MyPlantsPage() {
  const [plants, setPlants] = useLocalStorageState("favourites");

  const favouritePlants = plants
    ? plants.filter((plant) => plant.isFavourite)
    : [];

  function toggleFavourite(id) {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id ? { ...plant, isFavourite: !plant.isFavourite } : plant
      )
    );
  }

  return (
    <div>
      {favouritePlants.length > 0 ? (
        <PlantList plants={favouritePlants} toggleFavourite={toggleFavourite} />
      ) : (
        <>
          <StyledHeader>My Plants Collection</StyledHeader>
          <StyledParagraph>
            No favourite plants found. Please select some favourite plants.
          </StyledParagraph>
        </>
      )}
      <Footer />
    </div>
  );
}

const StyledHeader = styled.h1`
  display: flex;
  justify-content: center;
`;

const StyledParagraph = styled.p`
  padding: 15px;
`;
