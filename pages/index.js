import PlantList from "@/components/PlantList";
import { plants } from "@/assets/plants";
import Footer from "@/components/Footer";
import useLocalStorageState from "use-local-storage-state";
import PlantForm from "@/components/PlantForm";
import { uid } from "uid";
const initialPlants = plants;

export default function Homepage() {
  const [plants, setPlants] = useLocalStorageState("favourites", {
    defaultValue: initialPlants,
  });

  function addPlant(plantData) {
    const newPlant = { id: uid(), ...plantData, isFavourite: false };
    setPlants((prevPlants) => [newPlant, ...prevPlants]);
  }

  function toggleFavourite(id) {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id ? { ...plant, isFavourite: !plant.isFavourite } : plant
      )
    );
  }

  return (
    <div>
      <PlantList
        plants={plants}
        toggleFavourite={toggleFavourite}
        onSubmitPlant={addPlant}
      />
      <Footer />
    </div>
  );
}
