import styled from "styled-components";
import PlantCard from "./PlantCard";

export default function PlantList({ plants, toggleFavourite }) {
  if (!plants || plants.length === 0)
    return (
      <p>
        There are no plants here yet! Start adding some to create your own plant
        collection.
      </p>
    );

  return (
    <ul>
      {plants.map((plant) => (
        <li key={plant.id}>
          <PlantCard plant={plant} toggleFavourite={toggleFavourite} />
        </li>
      ))}
    </ul>
  );
}
