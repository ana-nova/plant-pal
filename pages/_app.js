import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import Layout from "@/components/Layout";
import { uid } from "uid";
import { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const [reminders, setReminders] = useLocalStorageState("reminders", {
    defaultValue: [],
  });

  async function toggleFavourite(id, isFavourite) {
    const response = await fetch(`/api/plants/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isFavourite: !isFavourite }),
    });

    if (!response.ok) {
      console.error("Failed to toggle favorite state.");
      return;
    }
    mutate(`/api/plants`);
  }

  function handleAddReminder(plantId, taskType, dueDate, interval) {
    const newReminder = {
      id: uid(),
      plantId,
      taskType,
      dueDate,
      interval,
      isDone: false,
    };
    setReminders((prevReminders) => [...prevReminders, newReminder]);
  }

  function handleEditReminder(reminderId, updatedReminder) {
    setReminders((prevReminders) =>
      prevReminders.map((reminder) =>
        reminder.id === reminderId
          ? { ...reminder, ...updatedReminder }
          : reminder
      )
    );
  }

  function handleDeleteReminder(reminderId) {
    setReminders((prevReminders) =>
      prevReminders.filter((reminder) => reminder.id !== reminderId)
    );
  }

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <Layout reminders={reminders} onEditReminder={handleEditReminder}>
          <GlobalStyle />
          <Component
            {...pageProps}
            toggleFavourite={toggleFavourite}
            reminders={reminders}
            onAddReminder={handleAddReminder}
            onEditReminder={handleEditReminder}
            onDeleteReminder={handleDeleteReminder}
          />
        </Layout>
      </SWRConfig>
    </>
  );
}
