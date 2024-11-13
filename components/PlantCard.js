import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

import PlantFavIcon from "@/public/Icons/plant-line.svg";
import PlantFavIconFill from "@/public/Icons/plant-fill.svg";
import ReminderIcon from "@/public/Icons/calendar-schedule-line.svg";

export default function PlantCard({
  plant,
  toggleFavourite,
  hasActiveReminder,
}) {
  return (
    <StyledArticle>
      <ButtonFavourite
        aria-label={
          plant.isFavourite ? "Remove from favorites" : "Add to favorites"
        }
        onClick={() => toggleFavourite(plant.id)}
      >
        {plant.isFavourite ? <PlantFavIconFill /> : <PlantFavIcon />}
      </ButtonFavourite>
      <h2>{plant.name}</h2>
      <p>{plant.botanicalName}</p>

      <Image
        alt={`Image of ${plant.name}`}
        width={200}
        height={200}
        src={plant.imageUrl || "/assets/empty.avif"}
      />

      {hasActiveReminder && <StyledReminderIcon />}

      <SeeMoreLink href={`/${plant.id}`}>see more</SeeMoreLink>
    </StyledArticle>
  );
}

const StyledReminderIcon = styled(ReminderIcon)`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const StyledArticle = styled.article`
  padding: 10px 10px 30px;
  margin: 0 21px 23px -20px;
`;

const ButtonFavourite = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  color: var(--color-button-favourite);

  &:hover {
    background-color: transparent;
    transform: scale(1.1);
  }
`;

const SeeMoreLink = styled(Link)`
  display: inline-block;
  font-size: 1rem;
  color: var(--color-text-primary);
  border-radius: var(--border-radius);
  padding: 10px 15px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: absolute;
  bottom: 10px;
  right: 10px;

  &:hover {
    border: 1px solid var(--color-link-see-more-hover);
  }
`;
