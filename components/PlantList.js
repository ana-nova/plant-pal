import PlantCard from "./PlantCard";
import useSWR from "swr";

export default function PlantList({ plants, toggleFavourite, reminders }) {
  if (!plants || plants.length === 0) {
    return (
      <p>
        There are no plants here yet! Start adding some to create your own plant
        collection.
      </p>
    );
  }

  return (
    <ul>
      {plants.map((plant) => {
        const plantReminders = reminders.filter(
          (reminder) => reminder.plantId === plant._id && !reminder.isDone
        );

        return (
          <li key={plant._id}>
            <PlantCard
              _id={plant._id}
              plant={plant}
              toggleFavourite={toggleFavourite}
              hasActiveReminder={plantReminders.length > 0}
            />
          </li>
        );
      })}
    </ul>
  );
}
