import PlantList from "@/components/PlantList";
import { plants } from "@/assets/plants";
import Footer from "@/components/Footer";
import useLocalStorageState from "use-local-storage-state";
const initialPlants = plants;

export default function Homepage() {
  const [plants, setPlants] = useLocalStorageState("favourites", {
    defaultValue: initialPlants,
  });

  function toggleFavourite(id) {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id ? { ...plant, isFavourite: !plant.isFavourite } : plant
      )
    );
  }

  return (
    <div>
      <PlantList plants={plants} toggleFavourite={toggleFavourite} />
      <Footer />
    </div>
  );
}
