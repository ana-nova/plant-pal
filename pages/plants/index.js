import { useEffect, useState } from "react";
import PlantForm from "@/components/PlantForm";
import PlantList from "@/components/PlantList";
import SearchPlant from "@/components/SearchPlant";
import styled from "styled-components";
import useSWR from "swr";

export default function Homepage({ toggleFavourite, reminders }) {
  const { data: plants, error, isLoading } = useSWR("/api/plants");

  const [filteredPlants, setFilteredPlants] = useState([]);

  useEffect(() => {
    if (plants) {
      setFilteredPlants(plants);
    }
  }, [plants]);

  if (isLoading) return <p>Loading plants...</p>;
  if (error) return <p>Failed to load plants.</p>;

  return (
    <>
      <SearchPlant setFilteredPlants={setFilteredPlants} allPlants={plants} />

      {filteredPlants.length > 0 ? (
        <PlantList
          plants={filteredPlants || []}
          toggleFavourite={toggleFavourite}
          reminders={reminders}
        />
      ) : (
        <p>No plants found for the selected filter.</p>
      )}
    </>
  );
}
