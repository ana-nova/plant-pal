import PlantList from "@/components/PlantList";
import styled from "styled-components";

export default function MyPlantsPage({ plants, toggleFavourite }) {
  const favouritePlants = plants
    ? plants.filter((plant) => plant.isFavourite)
    : [];

  return (
    <>
      <h1>My Plants</h1>
      {favouritePlants.length > 0 ? (
        <PlantList plants={favouritePlants} toggleFavourite={toggleFavourite} />
      ) : (
        <StyledCard>
          Looks like you have not added any favorite plants yet! Start selecting
          some to see them here.
        </StyledCard>
      )}
    </>
  );
}

const StyledCard = styled.article`
  padding: 10px 10px 30px;
  margin: 20px 38px 23px 35px;
`;
