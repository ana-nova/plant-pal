import dbConnect from "@/db/connect";
import Reminder from "@/db/models/Reminders";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const reminders = await Reminder.find();
    res.status(200).json(reminders);
    return;
  }

  if (req.method === "POST") {
    const newReminder = new Reminder(req.body);
    const savedReminder = await newReminder.save();
    res.status(201).json(savedReminder);
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
