import PlantList from "@/components/PlantList";
import { useState } from "react";
import { plants } from "@/assets/plants";
import Footer from "@/components/Footer";
const initialPlants = plants;

export default function Homepage() {
  const [plants, setPlants] = useState(initialPlants);

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
