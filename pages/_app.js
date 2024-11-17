import GlobalStyle from "../styles";
import Layout from "@/components/Layout";
import useSWR, { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const { data: plants, mutate: mutatePlants } = useSWR("/api/plants", fetcher);
  const { data: reminders, mutate: mutateReminders } = useSWR(
    "/api/reminders",
    fetcher
  );

  async function toggleFavourite(id, isFavourite) {
    mutatePlants(
      "/api/plants",
      (plants) =>
        plants.map((plant) =>
          plant._id === id ? { ...plant, isFavourite: !isFavourite } : plant
        ),
      false
    );

    const response = await fetch(`/api/plants/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isFavourite: !isFavourite }),
    });

    if (!response.ok) {
      console.error("Failed to toggle favorite state.");
      mutatePlants("/api/plants");
      return;
    }
    mutatePlants("/api/plants");
  }

  async function handleAddReminder(newReminder) {
    const response = await fetch("/api/reminders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReminder),
    });

    if (response.ok) {
      mutateReminders();
    } else {
      console.error("Failed to add reminder");
    }
  }

  async function handleEditReminder(reminderId, updatedReminder) {
    const response = await fetch(`/api/reminders/${reminderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedReminder),
    });

    if (response.ok) {
      mutateReminders();
    } else {
      console.error("Failed to edit reminder");
    }
  }

  async function handleDeleteReminder(reminderId) {
    const response = await fetch(`/api/reminders/${reminderId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      mutateReminders();
    } else {
      console.error("Failed to delete reminder");
    }
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
