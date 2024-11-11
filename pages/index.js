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
    setShowForm(!showForm);
  }

  function handleToggleDropdown() {
    setShowDropdown(!showDropdown);
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
        <button onClick={handleToggleForm}>
          {showForm ? "Hide form" : "Add new plant"}
        </button>
      </ButtonContainer>
      {showForm && (
        <PlantForm onSubmitPlant={onAddPlant} onToggleForm={handleToggleForm} />
      )}

      <FilterContainer>
        <FilterButton onClick={handleToggleDropdown}>
          <FilterIcon />
        </FilterButton>
        {lightFilter && (
          <FilterTag onClick={clearFilter}>
            {lightFilter} <span>&times;</span>
          </FilterTag>
        )}
        {showDropdown && (
          <Dropdown>
            <FilterOption
              onClick={() => handleLightFilter("Full Sun")}
              isActive={lightFilter === "Full Sun"}
            >
              Full Sun
            </FilterOption>
            <FilterOption
              onClick={() => handleLightFilter("Partial Shade")}
              isActive={lightFilter === "Partial Shade"}
            >
              Partial Shade
            </FilterOption>
            <FilterOption
              onClick={() => handleLightFilter("Full Shade")}
              isActive={lightFilter === "Full Shade"}
            >
              Full Shade
            </FilterOption>
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
  align-items: center;
  margin: 10px 0;
  gap: 10px;
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
`;

const FilterOption = styled.button`
  background: ${({ isActive }) => (isActive ? "#e0e0e0" : "transparent")};
  border: none;
  padding: 8px 12px;
  text-align: left;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const FilterTag = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 12px;
  padding: 5px 10px;
  font-size: 0.9em;
  color: #333;
  cursor: pointer;

  span {
    margin-left: 8px;
    font-weight: bold;
    color: #888;
  }

  &:hover {
    background-color: #d0d0d0;
  }
`;
