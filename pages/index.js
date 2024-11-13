import PlantForm from "@/components/PlantForm";
import PlantList from "@/components/PlantList";
import FilterIcon from "@/public/Icons/filter-line.svg";
import { useState } from "react";
import styled from "styled-components";

export default function Homepage({
  plants,
  toggleFavourite,
  onAddPlant,
  reminders,
}) {
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
      <ButtonContainer>
        <ButtonAdd onClick={handleToggleForm}>
          {showForm ? "Hide form" : "Add new plant"}
        </ButtonAdd>
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
              $isActive={lightFilter === "Full Sun"}
            >
              Full Sun
            </FilterOption>
            <FilterOption
              onClick={() => handleLightFilter("Partial Shade")}
              $isActive={lightFilter === "Partial Shade"}
            >
              Partial Shade
            </FilterOption>
            <FilterOption
              onClick={() => handleLightFilter("Full Shade")}
              $isActive={lightFilter === "Full Shade"}
            >
              Full Shade
            </FilterOption>
          </Dropdown>
        )}
      </FilterContainer>

      {filteredPlants.length > 0 ? (
        <PlantList
          plants={filteredPlants}
          toggleFavourite={toggleFavourite}
          reminders={reminders}
        />
      ) : (
        <p>No plants found for the selected filter.</p>
      )}
    </>
  );
}

const ButtonAdd = styled.button`
  background-color: var(--color-button-add);

  &:hover {
    background-color: var(--color-button-add-hover);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const FilterContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  top: 10px;
  right: 10px;
`;

const FilterButton = styled.button`
  color: var(--color-button-filter);

  &:hover {
    background-color: transparent;
    transform: scale(1.1);
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: var(--color-background-cards);
  border: 1px solid var(--color-button-border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 5px;
  z-index: 100;
`;

const FilterOption = styled.button`
  background: ${({ isActive }) =>
    isActive ? "var(--color-link-see-more-hover)" : "transparent"};
  color: var(--color-text-primary);
  text-align: left;

  &:hover {
    background-color: var(--color-link-see-more);
  }
`;

const FilterTag = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: var(--color-button-filter-tag);
  color: var(--color-button-text);
  border-radius: var(--border-radius);
  padding: 5px 10px;
  font-size: 0.9em;
  cursor: pointer;

  span {
    margin-left: 8px;
    font-weight: bold;
    color: var(--color-button-text);
  }

  &:hover {
    background-color: var(--color-link-see-more);
  }
`;
