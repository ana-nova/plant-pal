import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import { plants } from "@/assets/plants";
import Layout from "@/components/Layout";
import router from "next/router";

import { uid } from "uid";
const initialPlants = plants;

export default function App({ Component, pageProps }) {
  const [plants, setPlants] = useLocalStorageState("plants", {
    defaultValue: initialPlants,
  });

  const [reminders, setReminders] = useLocalStorageState("reminders", {
    defaultValue: [],
  });

  function handleAddPlant(plantData) {
    const newPlant = { id: uid(), ...plantData, isFavourite: false };
    setPlants((prevPlants) => [newPlant, ...prevPlants]);
  }

  function handleEditPlant(plantId, updatedPlant) {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === plantId ? { ...plant, ...updatedPlant } : plant
      )
    );
  }

  function handleDeletePlant(id) {
    setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
    router.push("/");
  }

  function toggleFavourite(id) {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id ? { ...plant, isFavourite: !plant.isFavourite } : plant
      )
    );
  }

  function handleAddReminder(plantId, taskType, dueDate) {
    const newReminder = {
      id: uid(),
      plantId,
      taskType,
      dueDate,
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
    </>
  );
}
