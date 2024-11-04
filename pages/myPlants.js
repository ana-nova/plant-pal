import PlantList from "@/components/PlantList";

export default function MyPlantsPage({ plants, toggleFavourite }) {
  const favouritePlants = plants
    ? plants.filter((plant) => plant.isFavourite)
    : [];
  console.log("favourtie", favouritePlants);

  console.log("plants", plants);

  return (
    <div>
      <h1>My Favourite Plants</h1>
      {favouritePlants.length > 0 ? (
        <PlantList plants={favouritePlants} toggleFavourite={toggleFavourite} />
      ) : (
        <p>No favourite plants found</p>
      )}
    </div>
  );
}
