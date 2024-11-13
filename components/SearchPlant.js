import { useState } from "react";
import styled from "styled-components";
import FuzzySearch from "fuzzy-search";
import FilterIcon from "@/public/Icons/filter-line.svg";

export default function SearchPlant({ plants, setFilteredPlants }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [lightFilter, setLightFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const searcher = new FuzzySearch(plants, ["name", "botanicalName"], {
    caseSensitive: false,
  });

  function handleSearchChange(event) {
    const query = event.target.value;
    setSearchQuery(query);
    updateFilteredPlants(query, lightFilter);
  }

  function handleToggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  function handleLightFilter(filter) {
    setLightFilter(filter);
    setShowDropdown(false);
    updateFilteredPlants(searchQuery, filter);
  }

  function clearFilter() {
    setLightFilter("");
    setShowDropdown(false);
    updateFilteredPlants(searchQuery, "");
  }

  function updateFilteredPlants(query, filter) {
    const filtered = plants
      .filter((plant) => !query || searcher.search(query).includes(plant))
      .filter((plant) => !filter || plant.lightNeed === filter);
    setFilteredPlants(filtered);
  }

  return (
    <>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search plants..."
        />
      </div>

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
    </>
  );
}

// Styling components as in your original code
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
