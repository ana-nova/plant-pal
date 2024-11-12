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

import NotificationIcon from "@/public/Icons/hourglass-2-fill.svg";
import MarkDoneIcon from "@/public/Icons/check-fill.svg";
import RepeatIcon from "@/public/Icons/repeat-fill.svg";

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

export default function PlantDetails({
  plants,
  onDeletePlant,
  onEditPlant,
  reminders,
  onAddReminder,
  onEditReminder,
  onDeleteReminder,
}) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [newTaskType, setNewTaskType] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [repeatInterval, setRepeatInterval] = useState("");

  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) return null;

  const plant = plants.find((plant) => plant.id === id);

  if (!plant) return <p>Plant not found</p>;

  const plantReminders = reminders.filter(
    (reminder) => reminder.plantId === plant.id
  );

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

  function handleAddReminder() {
    if (newTaskType && newDueDate) {
      onAddReminder(plant.id, newTaskType, newDueDate, repeatInterval);
      setNewTaskType("");
      setNewDueDate("");
      setRepeatInterval("");
      setShowPopup(false);
    }
  }

  function togglePopup() {
    setShowPopup(!showPopup);
  }

  function handleRepeatReminder(reminderId) {
    const reminderEntry = reminders.find(
      (reminder) => reminder.id === reminderId
    );
    if (reminderEntry && reminderEntry.interval) {
      const newDueDate = calculateNextDueDate(
        reminderEntry.dueDate,
        reminderEntry.interval
      );
      onEditReminder(reminderId, { dueDate: newDueDate });
    }
  }

  function calculateNextDueDate(currentDueDate, interval) {
    const dueDate = new Date(currentDueDate);
    switch (interval) {
      case "weekly":
        dueDate.setDate(dueDate.getDate() + 7);
        break;
      case "bi-weekly":
        dueDate.setDate(dueDate.getDate() + 14);
        break;
      case "monthly":
        dueDate.setMonth(dueDate.getMonth() + 1);
        break;
      default:
        break;
    }
    return dueDate.toISOString().split("T")[0];
  }

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

          {plant.description && (
            <DescriptionContainer>
              <p>{plant.description}</p>
            </DescriptionContainer>
          )}

          <AllIconsContainer>
            <IconContainer>
              {lightNeedIcon[plant.lightNeed]}
              <span>{plant.lightNeed}</span>
            </IconContainer>

            <IconContainer>
              {waterNeedIcon[plant.waterNeed]}
              <span>{plant.waterNeed} Water Need</span>
            </IconContainer>

            {plant.fertiliserSeason && plant.fertiliserSeason.length > 0 && (
              <IconContainer>
                <FertiliserIcon />
                {plant.fertiliserSeason.map((season) => (
                  <span key={season}>{season}</span>
                ))}
              </IconContainer>
            )}
          </AllIconsContainer>

          <section>
            <ButtonEdit onClick={handleEditClick}>
              <EditIcon />
            </ButtonEdit>

            {!showConfirmation ? (
              <ButtonDeleteIcon onClick={handleDelete}>
                <TrashIcon />
              </ButtonDeleteIcon>
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
      <CardDetails>
        {showPopup && (
          <PopupContainer>
            <PopupContent>
              <h3>Add a Reminder</h3>
              <p>{plant.name}</p>
              <label>
                Task Type:
                <input
                  type="text"
                  value={newTaskType}
                  onChange={(event) => setNewTaskType(event.target.value)}
                  required
                />
              </label>

              <label>
                Due Date:
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(event) => setNewDueDate(event.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </label>

              <label>
                Repeat Interval:
                <select
                  value={repeatInterval}
                  onChange={(event) => setRepeatInterval(event.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </label>

              <ButtonSave onClick={handleAddReminder}>Add Reminder</ButtonSave>
              <ButtonCancel onClick={togglePopup}>Close</ButtonCancel>
            </PopupContent>
          </PopupContainer>
        )}

        <h3>Your Reminders</h3>
        {plantReminders.length === 0 ? (
          <p>Currently no reminders here ...</p>
        ) : (
          plantReminders.map((reminder) => (
            <ReminderItem key={reminder.id}>
              <p>
                Task: {reminder.taskType}, Due Date:{" "}
                {new Date(reminder.dueDate).toLocaleDateString()}
              </p>
              <ReminderIconContainer>
                <ButtonDone
                  onClick={() =>
                    onEditReminder(reminder.id, { isDone: !reminder.isDone })
                  }
                >
                  {reminder.isDone ? (
                    <RepeatIcon
                      onClick={() => handleRepeatReminder(reminder.id)}
                    />
                  ) : (
                    <MarkDoneIcon />
                  )}
                </ButtonDone>
                <ButtonDeleteIcon onClick={() => onDeleteReminder(reminder.id)}>
                  <TrashIcon />
                </ButtonDeleteIcon>
              </ReminderIconContainer>
            </ReminderItem>
          ))
        )}
        <ButtonNotification onClick={togglePopup}>
          <NotificationIcon />
        </ButtonNotification>
      </CardDetails>
    </>
  );
}

const ReminderIconContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CardDetails = styled.article`
  padding: 10px 10px 30px;
  margin: 20px 38px 23px 35px;

  @media (min-width: 720px) {
    width: 50%;
    margin: 20px auto 0 auto;
  }
`;

const ButtonEdit = styled.button`
  color: var(--color-button-favourite);
  margin: 5px;
`;

const ButtonNotification = styled.button`
  color: var(--color-button-favourite);
  margin: 5px;
`;

const ButtonSave = styled.button`
  background-color: var(--color-button-save);

  &:hover {
    background-color: var(--color-button-save-hover);
  }
`;

const ButtonDone = styled.button`
  color: var(--color-text-primary);
`;

const ButtonDeleteIcon = styled.button`
  color: var(--color-button-favourite);
  margin: 5px;
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
  margin: 0 30px 0 30px;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ReminderItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DescriptionContainer = styled.section`
  margin: 0 30px 0 30px;

  @media (min-width: 720px) {
    margin: 0 100px 0 100px;
  }
`;
