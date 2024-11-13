import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

import HouseLine from "@/public/Icons/home-4-line.svg";
import HouseFill from "@/public/Icons/home-4-fill.svg";
import PlantLine from "@/public/Icons/plant-line.svg";
import PlantFill from "@/public/Icons/plant-fill.svg";
import ReminderIcon from "@/public/Icons/calendar-schedule-line.svg";

export default function Footer({ plants, reminders, onEditReminder }) {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function handleTogglePopup() {
    setIsPopupOpen(!isPopupOpen);
  }

  function handleMarkAsDone(reminderId) {
    const reminderEntry = reminders.find(
      (reminder) => reminder.id === reminderId
    );
    if (reminderEntry) {
      onEditReminder(reminderId, { isDone: !reminderEntry.isDone });
    }
  }

  const today = new Date().toISOString().split("T")[0];

  const hasTodayReminder = reminders.some(
    (reminder) => !reminder.isDone && reminder.dueDate === today
  );

  return (
    <footer>
      <IconsContainer>
        <StyledLink href={"/"} aria-label="Go to homepage">
          {router.pathname === "/" ? <HouseFill /> : <HouseLine />}
        </StyledLink>

        <button onClick={handleTogglePopup} aria-label="View reminders">
          <ReminderIcon />
          {hasTodayReminder && <RedDot />}
        </button>

        <StyledLink href={"/favourites"} aria-label="Go to favourite plants">
          {router.pathname === "/favourites" ? <PlantFill /> : <PlantLine />}
        </StyledLink>
      </IconsContainer>

      {isPopupOpen && (
        <PopupContainer>
          <PopupContent>
            <h2>Your Reminders</h2>
            {reminders.filter((reminder) => !reminder.isDone).length > 0 ? (
              reminders
                .filter((reminder) => !reminder.isDone)
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                .map((reminder) => {
                  const plant = plants.find(
                    (plant) => plant.id === reminder.plantId
                  );
                  return (
                    <ReminderItem key={reminder.id}>
                      <p>
                        <strong>{plant ? plant.name : "Unknown Plant"}</strong>
                      </p>
                      <p>
                        <strong>Task:</strong> {reminder.taskType}
                      </p>
                      <p>
                        <strong>Due Date:</strong>{" "}
                        {new Date(reminder.dueDate).toLocaleDateString()}
                      </p>
                      <MarkDoneButton
                        onClick={() => handleMarkAsDone(reminder.id)}
                      >
                        Mark as Done
                      </MarkDoneButton>
                    </ReminderItem>
                  );
                })
            ) : (
              <p>No pending reminders!</p>
            )}
            <CloseButton onClick={handleTogglePopup}>Close</CloseButton>
          </PopupContent>
        </PopupContainer>
      )}
    </footer>
  );
}

const MarkDoneButton = styled.button`
  color: var(--color-button-cancel);
`;

const IconsContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const StyledLink = styled(Link)`
  color: var(--color-button-text);
`;

const RedDot = styled.span`
  position: absolute;
  top: -5;
  right: -5;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
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
  border-radius: 8px;
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 400px;
  max-height: 50vh;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ReminderItem = styled.div`
  margin: 10px 0;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  background-color: var(--color-button-cancel);
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
