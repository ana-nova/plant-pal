import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import { plants as initialPlantsData } from "@/assets/plants";
import Layout from "@/components/Layout";
import { uid } from "uid";

const initialPlants = initialPlantsData;

export default function App({ Component, pageProps }) {
  const [plants, setPlants] = useLocalStorageState("plants", {
    defaultValue: initialPlants,
  });

  function handleAddPlant(plantData) {
    const newPlant = { id: uid(), ...plantData, isFavourite: false };
    setPlants((prevPlants) => [newPlant, ...prevPlants]);
  }

  function handleEditPlant(plantId, updatedPlant) {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === plantId ? { ...plant, ...updatedPlant } : plant
      )
    );
  }

  function handleDeletePlant(id) {
    setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
    router.push("/");
  }

  function toggleFavourite(id) {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id ? { ...plant, isFavourite: !plant.isFavourite } : plant
      )
    );
  }

  async function handleSubmit(event, plantId) {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const uploadedImageUrl = data.secure_url;

        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === plantId
              ? { ...plant, imageUrl: uploadedImageUrl }
              : plant
          )
        );
      } else {
        console.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  return (
    <Layout>
      <GlobalStyle />
      <Component
        {...pageProps}
        plants={plants}
        toggleFavourite={toggleFavourite}
        onAddPlant={handleAddPlant}
        onDeletePlant={handleDeletePlant}
        onEditPlant={handleEditPlant}
        handleSubmit={handleSubmit}
      />
    </Layout>
  );
}
