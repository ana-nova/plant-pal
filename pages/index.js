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

  function handleToggleForm() {
    setShowForm((prev) => !prev);
  }

  function handleLightFilter(event) {
    setLightFilter(event.target.value);
    setShowDropdown(false);
  }

  function clearFilter() {
    setLightFilter("");
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
        <FilterIcon onClick={handleToggleDropdown}>
          <FilterIcon />
        </FilterIcon>
        {showDropdown && (
          <Dropdown>
            <select
              id="lightFilter"
              value={lightFilter}
              onChange={handleLightFilter}
            >
              <option value="">All</option>
              <option value="Full Sun">Full Sun</option>
              <option value="Partial Shade">Partial Shade</option>
              <option value="Full Shade">Full Shade</option>
            </select>
            {lightFilter && <button onClick={clearFilter}>Clear Filter</button>}
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
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
  align-items: center;

  select {
    padding: 5px;
    border-radius: 5px;
  }

  button {
    margin-left: 10px;
    padding: 5px 10px;
  }
`;

const StyledHeader = styled.h1`
  display: flex;
  justify-content: center;
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  select {
    padding: 5px;
    border-radius: 5px;
  }

  button {
    padding: 5px 10px;
  }
`;
