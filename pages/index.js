import PlantForm from "@/components/PlantForm";
import PlantList from "@/components/PlantList";
import FilterIcon from "@/public/Icons/filter-line.svg";
import { useState } from "react";
import styled from "styled-components";

export default function Homepage({ plants, toggleFavourite, onAddPlant }) {
  const [showForm, setShowForm] = useState(false);
  const [lightFilter, setLightFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  function handleToggleForm() {
    setShowForm((prev) => !prev);
  }

  function handleToggleDropdown() {
    setShowDropdown((prev) => !prev);
  }

  function handleLightFilter(filter) {
    setLightFilter(filter);
    setShowDropdown(false);
  }

  function clearFilter() {
    setLightFilter("");
    setShowDropdown(false);
  }

  const filteredPlants = lightFilter
    ? plants.filter((plant) => plant.lightNeed === lightFilter)
    : plants;

  return (
    <>
      <StyledHeader>My Plants Collection</StyledHeader>
      <ButtonContainer>
        <button className="button-add" onClick={handleToggleForm}>
          {showForm ? "Hide form" : "Add new plant"}
        </button>
      </ButtonContainer>
      {showForm && (
        <PlantForm onSubmitPlant={onAddPlant} onToggleForm={handleToggleForm} />
      )}

      <FilterContainer>
        <FilterButton onClick={handleToggleDropdown}>
          <FilterIcon width="24" height="24" />
        </FilterButton>
        {showDropdown && (
          <Dropdown>
            {lightFilter && <button onClick={clearFilter}>Clear Filter</button>}
            <button onClick={() => handleLightFilter("Full Sun")}>
              Full Sun
            </button>
            <button onClick={() => handleLightFilter("Partial Shade")}>
              Partial Shade
            </button>
            <button onClick={() => handleLightFilter("Full Shade")}>
              Full Shade
            </button>
          </Dropdown>
        )}
      </FilterContainer>

      {filteredPlants.length > 0 ? (
        <PlantList plants={filteredPlants} toggleFavourite={toggleFavourite} />
      ) : (
        <p>No plants found for the selected filter.</p>
      )}
    </>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const FilterContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`;

const FilterButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const StyledHeader = styled.h1`
  display: flex;
  justify-content: center;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 5px;
  z-index: 100;

  button {
    background: none;
    border: none;
    padding: 8px 12px;
    text-align: left;
    width: 100%;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;
