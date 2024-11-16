import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import Layout from "@/components/Layout";
import { uid } from "uid";
import useSWR, { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const { data: plants, error, mutate } = useSWR("/api/plants", fetcher);
  const [reminders, setReminders] = useLocalStorageState("reminders", {
    defaultValue: [],
  });

  if (error) {
    console.error("Error loading plants:", error);
    return <p>Failed to load plants.</p>;
  }

  if (!plants) return <p>Loading plants...</p>;

  function handleAddPlant(newPlant) {
    fetch("/api/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((createdPlant) =>
        mutate((plants) => [...plants, createdPlant], false)
      )
      .catch((err) => console.error("Failed to add plant:", err));
  }

  function handleEditPlant(id, updatedPlant) {
    fetch(`/api/plants/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPlant),
    })
      .then(() => mutate())
      .catch((err) => console.error("Failed to edit plant:", err));
  }

  function handleDeletePlant(id) {
    fetch(`/api/plants/${id}`, {
      method: "DELETE",
    })
      .then(() =>
        mutate((plants) => plants.filter((plant) => plant._id !== id), false)
      )
      .catch((err) => console.error("Failed to delete plant:", err));
  }

  function toggleFavourite(id) {
    const plantToUpdate = plants.find((plant) => plant._id === id);

    if (!plantToUpdate) {
      console.error(`Plant with id ${id} not found.`);
      return;
    }

    const updatedPlants = plants.map((plant) =>
      plant._id === id ? { ...plant, isFavourite: !plant.isFavourite } : plant
    );

    mutate(updatedPlants, false);

    fetch(`/api/plants/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isFavourite: !plantToUpdate.isFavourite,
      }),
    }).catch((err) => console.error("Failed to update favourite:", err));
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
        <Layout
          plants={plants}
          reminders={reminders}
          onEditReminder={handleEditReminder}
        >
          <GlobalStyle />
          <Component
            {...pageProps}
            plants={plants}
            toggleFavourite={toggleFavourite}
            onAddPlant={handleAddPlant}
            onDeletePlant={handleDeletePlant}
            onEditPlant={handleEditPlant}
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
