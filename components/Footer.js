import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

import HouseLine from "@/public/Icons/home-4-line.svg";
import HouseFill from "@/public/Icons/home-4-fill.svg";
import PlantLine from "@/public/Icons/plant-line.svg";
import PlantFill from "@/public/Icons/plant-fill.svg";
import ReminderIcon from "@/public/Icons/hourglass-2-fill.svg";

export default function Footer({ reminders }) {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Toggle popup visibility
  function handleTogglePopup() {
    setIsPopupOpen((prev) => !prev);
  }

  return (
    <footer>
      <StyledFooter href={"/"} aria-label="Go to homepage">
        {router.pathname === "/" ? <HouseFill /> : <HouseLine />}
      </StyledFooter>

      <StyledFooter
        as="button"
        onClick={handleTogglePopup}
        aria-label="View reminders"
      >
        <ReminderIcon />
        {reminders.some((reminder) => !reminder.isDone) && <RedDot />}
      </StyledFooter>

      <StyledFooter href={"/favourites"} aria-label="Go to favourite plants">
        {router.pathname === "/favourites" ? <PlantFill /> : <PlantLine />}
      </StyledFooter>

      {isPopupOpen && (
        <PopupContainer>
          <PopupContent>
            <h2>Reminders</h2>
            {reminders.filter((reminder) => !reminder.isDone).length > 0 ? (
              reminders
                .filter((reminder) => !reminder.isDone)
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                .map((reminder) => (
                  <ReminderItem key={reminder.id}>
                    <p>
                      <strong>{reminder.taskType}</strong> for{" "}
                      <strong>{reminder.plantName}</strong> due on{" "}
                      {new Date(reminder.dueDate).toLocaleDateString()}
                    </p>
                    <button onClick={() => handleMarkAsDone(reminder.id)}>
                      Mark as Done
                    </button>
                  </ReminderItem>
                ))
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

// Styled components
const StyledFooter = styled(Link)`
  color: var(--color-button-text);
  position: relative;
`;

const RedDot = styled.span`
  position: absolute;
  top: 0;
  right: 0;
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
