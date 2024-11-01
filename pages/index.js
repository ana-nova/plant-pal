import PlantList from "@/components/PlantList";
import { useState } from "react";
import { plants } from "@/assets/plants";

export default function Homepage() {
  const [isFavourite, setIsFavourite] = useState(false);

  function toggleFavourite(id) {
    setIsFavourite((prevFavourite) =>
      prevFavourite.map((plant) =>
        plant.id === id ? { ...plant, isFavourite: !plant.isFavourite } : plant
      )
    );
    return <PlantList plants={plants} toggleFavourite={toggleFavourite} />;
  }
}
