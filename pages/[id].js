import PlantDetails from "@/components/PlantDetails";
import { useRouter } from "next/router";
import useLocalStorageState from "use-local-storage-state";
export default function PlantDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [plants] = useLocalStorageState("plants", {
    defaultValue: [],
  });

  if (!router.isReady) return null;

  const plant = plants.find((plant) => plant.id === id);

  if (!plant) return <p>Plant not found</p>;

  return <PlantDetails plant={plant} />;
}
