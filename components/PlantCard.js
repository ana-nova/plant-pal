// Was macht diese Seite ?

import Image from "next/image";

// Die component visualisiert eine card:

// PlantName: Aloe Vera#

// PlantBotanicalname: Aloe barbadensis miller

// Image:

// button:

export default function PlantCard({ plant }) {
  return (
    <div>
      <h2>{plant.name}</h2>
      <p>{plant.botanicalName}</p>
      {/* <Image alt="image" src={plant.imageUrl} width={200} height={200}></Image> */}
    </div>
  );
}
