import PlantForm from "@/components/PlantForm";
import useSWR from "swr";
import { useRouter } from "next/router";
import Router from "next/router";

export default function CreatePage() {
  const { data: plants, error, isLoading, mutate } = useSWR("/api/plants");

  async function handleAddPlant(newPlantData) {
    const response = await fetch("/api/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlantData),
    });

    if (response.ok) {
      Router.push("/plants");
      mutate();
    }
  }

  if (isLoading) return <p>Loading plants...</p>;
  if (error) return <p>Failed to load plants.</p>;
  return (
    <>
      <PlantForm onSubmitPlant={handleAddPlant} />
    </>
  );
}
