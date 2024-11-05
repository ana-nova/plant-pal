import PlantList from "@/components/PlantList";
import styled from "styled-components";

export default function Homepage({ plants, toggleFavourite, onSubmitPlant }) {
  return (
    <>
      <StyledHeader>My Plants Collection</StyledHeader>
      <PlantList
        plants={plants}
        toggleFavourite={toggleFavourite}
        onSubmitPlant={onSubmitPlant}
      />
    </>
  );
}

const StyledHeader = styled.h1`
  display: flex;
  justify-content: center;
`;
