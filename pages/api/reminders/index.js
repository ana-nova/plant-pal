import dbConnect from "@/db/connect";
import Reminder from "@/db/models/Reminder";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const reminders = await Reminder.find();
    return res.status(200).json(reminders);
  }

  if (req.method === "POST") {
    const reminderData = req.body;
    const newReminder = new Reminder(reminderData);

    const savedReminder = await newReminder.save();
    return res.status(201).json(savedReminder);
  }

  res.status(405).json({ error: "Method not allowed" });
}
