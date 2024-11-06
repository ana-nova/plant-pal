import PlantDetails from "@/components/PlantDetails";
import { useRouter } from "next/router";

export default function PlantDetailsPage({ plants }) {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) return null;

  const plant = plants.find((plant) => plant.id === id);

  if (!plant) return <p>Plant not found</p>;

  return <PlantDetails plant={plant} />;
}
