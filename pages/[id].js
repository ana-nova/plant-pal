import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";
import PlantForm from "@/components/PlantForm";
import EditIcon from "@/public/Icons/pencil-fill.svg";
import TrashIcon from "@/public/Icons/delete-bin-5-fill.svg";

import LowWaterdropIcon from "@/public/Icons/drop-line.svg";
import MediumWaterdropIcon from "@/public/Icons/contrast-drop-2-line.svg";
import HighWaterdropIcon from "@/public/Icons/drop-fill.svg";

import FullSunIcon from "@/public/Icons/sun-fill.svg";
import PartialShadeIcon from "@/public/Icons/sun-foggy-fill.svg";
import FullShadeIcon from "@/public/Icons/sun-cloudy-fill.svg";

import FertiliserIcon from "@/public/Icons/leaf-fill.svg";

const lightNeedIcon = {
  "Full Sun": <FullSunIcon />,
  "Partial Shade": <PartialShadeIcon />,
  "Full Shade": <FullShadeIcon />,
};

const waterNeedIcon = {
  Low: <LowWaterdropIcon />,
  Medium: <MediumWaterdropIcon />,
  High: <HighWaterdropIcon />,
};

export default function PlantDetails({ plants, onDeletePlant, onEditPlant }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  function handleDelete() {
    setShowConfirmation(true);
  }
  function handleCancelDelete() {
    setShowConfirmation(false);
  }
  function handleConfirmDelete() {
    onDeletePlant(plant.id);
    setShowConfirmation(false);
  }
  function handleEditClick() {
    setShowEdit(true);
  }
  function handleEdit(updatedPlant) {
    onEditPlant(plant.id, updatedPlant);
    setShowEdit(false);
  }

  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) return null;

  const plant = plants.find((plant) => plant.id === id);

  if (!plant) return <p>Plant not found</p>;

  return (
    <>
      <h1>Details Page</h1>
      {!showEdit ? (
        <CardDetails>
          <Image
            alt={`image of ${plant.name}`}
            src={plant.imageUrl || "/assets/empty.avif"}
            width={200}
            height={200}
          />
          <h2>{plant.name}</h2>
          <h3>{plant.botanicalName}</h3>

          {plant.description && <p>{plant.description}</p>}

          <AllIconsContainer>
            <p>
              <IconContainer>
                {lightNeedIcon[plant.lightNeed]}
                <span>{plant.lightNeed}</span>
              </IconContainer>
            </p>

            <p>
              <IconContainer>
                {waterNeedIcon[plant.waterNeed]}
                <span>{plant.waterNeed} Water Need</span>
              </IconContainer>
            </p>

            {plant.fertiliserSeason && plant.fertiliserSeason.length > 0 && (
              <p>
                <IconContainer>
                  <FertiliserIcon />
                  {plant.fertiliserSeason.map((season) => (
                    <span key={season}>{season}</span>
                  ))}
                </IconContainer>
              </p>
            )}
          </AllIconsContainer>

          <section>
            <ButtonEdit onClick={handleEditClick}>
              <EditIcon />
            </ButtonEdit>

            {!showConfirmation ? (
              <ButtonDelete onClick={handleDelete}>
                <TrashIcon />
              </ButtonDelete>
            ) : (
              <>
                <p>Are you sure?</p>
                <ButtonCancel onClick={handleCancelDelete}>Cancel</ButtonCancel>
                <ButtonDelete onClick={handleConfirmDelete}>
                  Delete
                </ButtonDelete>
              </>
            )}
          </section>
        </CardDetails>
      ) : (
        <PlantForm
          initialData={plant}
          onSubmitPlant={handleEdit}
          onToggleForm={() => setShowEdit(false)}
          isEditMode={true}
        />
      )}
    </>
  );
}

const CardDetails = styled.article`
  padding: 10px 10px 30px;
  margin: 20px 38px 23px 35px;

  @media (min-width: 720px) {
    width: 50%;
    margin: 20px auto 0 auto;
  }
`;

const ButtonEdit = styled.button`
  background-color: var(--color-button-edit);
  margin: 5px;

  &:hover {
    background-color: var(--color-button-edit-hover);
  }
`;

const ButtonDelete = styled.button`
  background-color: var(--color-button-delete);
  margin: 5px;

  &:hover {
    background-color: var(--color-button-delete-hover);
  }
`;

const ButtonCancel = styled.button`
  background-color: var(--color-button-cancel);
  margin: 5px;

  &:hover {
    background-color: var(--color-button-cancel-hover);
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  span {
    font-size: 0.9rem;
    color: var(--color-text-primary);
    text-align: center;
  }
`;

const AllIconsContainer = styled.div`
  display: flex;
  gap: 50px;
  justify-content: center;
`;
