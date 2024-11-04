import { plants } from "@/assets/plants";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const lightNeedIcon = {
  "Full Sun": "☀️☀️☀️☀️",
  "Partial Shade": "☀️☀️☀️",
  Shade: "☀️☀️",
  "Full Shade": "☀️",
};

const waterNeedIcon = {
  Low: "💧",
  Medium: "💧💧",
  High: "💧💧💧",
};

const seasonIcons = {
  Spring: "🌱",
  Summer: "🐝",
  Fall: "🍂",
  Winter: "❄️",
};

export default function PlantDetails() {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) return null;

  const plant = plants.find((plant) => plant.id === id);

  if (!plant) return <p>Plant not found</p>;

  return (
    <>
      <Link href="/">Back</Link>

      <Container>
        <h1>Details Page</h1>
        <Image
          alt={`image of ${plant.name}`}
          src={plant.imageUrl}
          width={200}
          height={200}
        />
        <h2>{plant.name}</h2>
        <p>{plant.botanicalName}</p>
        <p>{plant.description}</p>
        <p>
          Light: {lightNeedIcon[plant.lightNeed] || "🌞"} {plant.lightNeed}
        </p>
        <p>
          Water need: {waterNeedIcon[plant.waterNeed] || "🌱"} {plant.waterNeed}
        </p>
        <p>
          Fertiliser season:
          {plant.fertiliserSeason.map((season) => (
            <span key={season}>
              {seasonIcons[season] || "🌱"} {season}{" "}
            </span>
          ))}
        </p>
      </Container>
    </>
  );
}

const Container = styled.main`
  border: 2px solid black;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px 10px 30px;
  margin: 20px 38px 23px 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;
