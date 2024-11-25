import dbConnect from "@/db/connect";
import Reminder from "@/db/models/Reminder";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  await dbConnect();

  const session = await getServerSession(req, res, authOptions);
  const token = session ? await getToken({ req }) : null;
  const userId = token?.sub;

  if (!session) {
    return res.status(401).json({ status: "Not authorized" });
  }

  if (req.method === "GET") {
    try {
      const reminders = await Reminder.find();
      return res.status(200).json(reminders);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch reminders" });
    }
  }

  if (req.method === "POST") {
    try {
      const reminderData = req.body;
      const newReminder = new Reminder({ ...reminderData, owner: userId });

      console.log(req.body);
      const savedReminder = await newReminder.save();
      return res.status(201).json(savedReminder);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Failed to create reminder" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
