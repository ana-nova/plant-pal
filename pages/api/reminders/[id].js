import dbConnect from "@/db/connect";
import Reminder from "@/db/models/Reminder";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const reminder = await Reminder.findById(id).populate("plantId");
    if (!reminder) {
      res.status(404).json({ error: "Reminder not found" });
      return;
    }
    res.status(200).json(reminder);
    return;
  }

  if (req.method === "PUT") {
    const updatedReminder = await Reminder.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedReminder) {
      res.status(404).json({ error: "Reminder not found" });
      return;
    }
    res.status(200).json(updatedReminder);
    return;
  }

  if (req.method === "DELETE") {
    const deletedReminder = await Reminder.findByIdAndDelete(id);
    if (!deletedReminder) {
      res.status(404).json({ error: "Reminder not found" });
      return;
    }
    res.status(200).json({ message: "Reminder deleted" });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
