import { plants } from "@/assets/plants";
import Image from "next/image";

export default function PlantList() {
  return (
    <div>
      <h1>My Plant Collection</h1>
      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>
            <h2>{plant.name}</h2>
            <p> BotanicalName :{plant.botanicalName}</p>
            <Image alt="Image" width={200} height={200} src={plant.imageUrl} />
          </li>
        ))}
      </ul>
    </div>
  );
}
