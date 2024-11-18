import { useEffect, useState } from "react";
import styled from "styled-components";
import FuzzySearch from "fuzzy-search";
import CloseIcon from "@/public/Icons/close-fill.svg";
import FilterIcon from "@/public/Icons/filter-line.svg";
import SearchIcon from "@/public/Icons/search-line.svg";

export default function SearchPlant({ allPlants, setFilteredPlants }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [lightFilter, setLightFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const searcher = new FuzzySearch(allPlants, ["name", "botanicalName"], {
      caseSensitive: false,
    });

    let results = allPlants;

    if (searchQuery) {
      results = searcher.search(searchQuery);
    }

    if (lightFilter) {
      results = results.filter((plant) => plant.lightNeed === lightFilter);
    }

    setFilteredPlants(results);
  }, [searchQuery, lightFilter, allPlants, setFilteredPlants]);

  function handleSearchChange(event) {
    const query = event.target.value;
    setSearchQuery(query);
  }

  function handleToggleDropdown() {
    setShowDropdown(!showDropdown);
  }
  function toggleSearch() {
    if (showSearch) {
      setSearchQuery("");
      setFilteredPlants(allPlants);
    }
    setShowSearch(!showSearch);
  }

  function handleLightFilter(filter) {
    setLightFilter(filter);
    setShowDropdown(false);
  }

  function clearFilter() {
    setLightFilter("");
    setShowDropdown(false);
  }

  return (
    <>
      <FilterContainer>
        <SearchFilterContainer>
          <SearchContainer>
            {showSearch && (
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search plants..."
              />
            )}
            <FilterButton onClick={toggleSearch}>
              {showSearch ? <CloseIcon /> : <SearchIcon />}
            </FilterButton>
          </SearchContainer>

          <FilterButton onClick={handleToggleDropdown}>
            <FilterIcon />
          </FilterButton>
          {lightFilter && (
            <FilterTag onClick={clearFilter}>
              {lightFilter} <span>&times;</span>
            </FilterTag>
          )}
        </SearchFilterContainer>

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
    </>
  );
}

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

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: -25px;
`;

const SearchFilterContainer = styled.section`
  display: flex;
  align-items: center;
`;
