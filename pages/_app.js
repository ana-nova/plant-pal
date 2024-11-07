import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import { plants } from "@/assets/plants";
import Layout from "@/components/Layout";
import router from "next/router";

import { uid } from "uid";
const initialPlants = plants;

export default function App({ Component, pageProps }) {
  const [plants, setPlants] = useLocalStorageState("plants", {
    defaultValue: initialPlants,
  });

  function handleAddPlant(plantData) {
    const newPlant = { id: uid(), ...plantData, isFavourite: false };
    setPlants((prevPlants) => [newPlant, ...prevPlants]);
  }

  function handleEditPlant(updatedPlant) {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      )
    );
  }

  // function handleEditPlant(updatePlant) {
  //   if (plants.find((plant) => plant.id === updatePlant.id)) {
  //     setPlants(
  //       plants.map((plant) => {
  //         if (plant.id === updatePlant.id) {
  //           return updatePlant;
  //         }
  //         return plant;
  //       })
  //     );
  //     return;
  //   }
  // }

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

  return (
    <>
      <Layout>
        <GlobalStyle />
        <Component
          {...pageProps}
          plants={plants}
          toggleFavourite={toggleFavourite}
          onAddPlant={handleAddPlant}
          onDeletePlant={handleDeletePlant}
          onEditPlant={handleEditPlant}
        />
      </Layout>
    </>
  );
}
