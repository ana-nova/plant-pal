import styled from "styled-components";
import NotificationIcon from "@/public/Icons/calendar-schedule-line.svg";
import MarkDoneIcon from "@/public/Icons/check-fill.svg";
import RepeatIcon from "@/public/Icons/repeat-fill.svg";
import TrashIcon from "@/public/Icons/delete-bin-5-fill.svg";

export default function PlantReminder({
  plant,
  reminders,
  showPopup,
  setShowPopup,
  onAddReminder,
  onEditReminder,
  onDeleteReminder,
}) {
  function handleSubmitReminder(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { taskType, dueDate, repeatInterval } = Object.fromEntries(formData);

    const newReminder = {
      plantId: plant._id,
      taskType,
      dueDate,
      interval: repeatInterval,
    };

    onAddReminder(newReminder);
    setShowPopup(false);
  }

  function handleRepeatReminder(reminderId) {
    const reminderEntry = reminders.find(
      (reminder) => reminder._id === reminderId
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
    console.log("Calculating next due date for:", currentDueDate, interval);
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
    <CardDetails>
      <h3>Your Reminders</h3>

      {showPopup && (
        <PopupContainer>
          <PopupContent>
            <h3>Add a Reminder</h3>
            <StyledForm onSubmit={handleSubmitReminder}>
              <label>
                Task Type:
                <input type="text" name="taskType" required />
              </label>
              <label>
                Due Date:
                <input
                  type="date"
                  name="dueDate"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </label>
              <label>
                Repeat Interval:
                <select name="repeatInterval">
                  <option value="">Select...</option>
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </label>

              <ButtonContainer>
                <ButtonSave type="submit">Save</ButtonSave>
                <ButtonCancel onClick={() => setShowPopup(false)}>
                  Cancel
                </ButtonCancel>
              </ButtonContainer>
            </StyledForm>
          </PopupContent>
        </PopupContainer>
      )}

      {reminders.length === 0 ? (
        <p>Currently no reminders here ...</p>
      ) : (
        reminders.map((reminder) => (
          <ReminderItem key={reminder._id}>
            <p>
              Task: {reminder.taskType}, Due Date:{" "}
              {new Date(reminder.dueDate).toLocaleDateString()}
            </p>
            <ReminderIconContainer>
              <ButtonDone
                onClick={() =>
                  onEditReminder(reminder._id, { isDone: !reminder.isDone })
                }
              >
                {reminder.isDone ? (
                  <RepeatIcon
                    onClick={() => handleRepeatReminder(reminder._id)}
                  />
                ) : (
                  <MarkDoneIcon />
                )}
              </ButtonDone>
              <ButtonDeleteIcon onClick={() => onDeleteReminder(reminder._id)}>
                <TrashIcon />
              </ButtonDeleteIcon>
            </ReminderIconContainer>
          </ReminderItem>
        ))
      )}

      <ButtonNotification onClick={() => setShowPopup(true)}>
        <NotificationIcon />
      </ButtonNotification>
    </CardDetails>
  );
}

const ReminderIconContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledForm = styled.form`
  box-shadow: none;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const CardDetails = styled.article`
  padding: 10px 10px 30px;
  margin: 20px 38px 23px 35px;

  @media (min-width: 720px) {
    width: 50%;
    margin: 20px auto 0 auto;
  }
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

const ButtonCancel = styled.button`
  background-color: var(--color-button-cancel);
  margin: 5px;

  &:hover {
    background-color: var(--color-button-cancel-hover);
  }
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
  text-align: center;
`;

const ReminderItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
