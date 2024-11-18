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
    const response = await fetch(`/api/plants/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isFavourite: !isFavourite }),
    });

    if (!response.ok) {
      mutatePlants("/api/plants");
      return;
    }
    mutatePlants();
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
      return;
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
    }
  }

  async function handleDeleteReminder(reminderId) {
    const response = await fetch(`/api/reminders/${reminderId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      mutateReminders();
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
