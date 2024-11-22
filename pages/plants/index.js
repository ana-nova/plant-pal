import { useEffect, useState } from "react";
import PlantForm from "@/components/PlantForm";
import PlantList from "@/components/PlantList";
import SearchPlant from "@/components/SearchPlant";
import styled from "styled-components";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function Homepage({ toggleFavourite, reminders }) {
  const { data: plants, error, isLoading, mutate } = useSWR("/api/plants");

  const [showForm, setShowForm] = useState(false);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [allPlants, setAllPlants] = useState([]);
  const [userPlants, setUserPlants] = useState([]);
  const { data: session } = useSession();

  // useEffect(() => {
  //   if (plants) {
  //     setFilteredPlants(plants);
  //   }
  // }, [plants]);

  useEffect(() => {
    async function fetchPlants() {
      try {
        const response = await fetch("/api/plants");
        const data = await response.json();

        setAllPlants(data.allPlants);
        if (session) {
          setUserPlants(data.userPlants);
        }
      } catch (error) {
        console.error("Failed to fetch plants:", error);
      }
    }

    fetchPlants();
  }, [session]);

  useEffect(() => {
    setFilteredPlants(allPlants);
  }, [allPlants]);

  function handleToggleForm() {
    setShowForm(!showForm);
  }

  async function handleAddPlant(newPlantData) {
    try {
      const response = await fetch("/api/plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlantData),
      });

      if (!response.ok) {
        throw new Error("Failed to add the plant. Please try again.");
      }

      setShowForm(false);
      mutate();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  if (isLoading) return <p>Loading plants...</p>;
  if (error) return <p>Failed to load plants.</p>;

  return (
    <>
      <ButtonContainer>
        <ButtonAdd onClick={handleToggleForm}>
          {showForm ? "Hide form" : "Add new plant"}
        </ButtonAdd>
      </ButtonContainer>

      {showForm && (
        <PlantForm
          onSubmitPlant={handleAddPlant}
          onToggleForm={handleToggleForm}
        />
      )}

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
