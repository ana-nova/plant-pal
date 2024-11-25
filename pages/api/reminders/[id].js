import dbConnect from "@/db/connect";
import Reminder from "@/db/models/Reminder";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  const session = await getServerSession(req, res, authOptions);

  // Prüfen, ob der Nutzer authentifiziert ist
  if (!session) {
    return res.status(401).json({ status: "Not authorized" });
  }

  if (req.method === "GET") {
    try {
      const reminder = await Reminder.findById(id).populate("plantId");
      if (!reminder) {
        return res.status(404).json({ error: "Reminder not found" });
      }

      return res.status(200).json(reminder);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch reminder" });
    }
  }

  if (req.method === "PUT") {
    try {
      const updatedReminder = await Reminder.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedReminder) {
        return res.status(404).json({ error: "Reminder not found" });
      }

      return res.status(200).json(updatedReminder);
    } catch (error) {
      return res.status(400).json({ error: "Failed to update reminder" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deletedReminder = await Reminder.findByIdAndDelete(id);
      if (!deletedReminder) {
        return res.status(404).json({ error: "Reminder not found" });
      }

      return res.status(200).json({ message: "Reminder deleted" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete reminder" });
    }
  }

  // Methode nicht erlaubt
  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
