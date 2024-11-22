import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plant";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  await dbConnect();

  const session = await getServerSession(req, res, authOptions);

  if (req.method === "GET") {
    try {
      if (session) {
        const plants = await Plant.find().sort({ createdAt: -1 });

        return res.status(200).json(plants);
      } else {
        return res.status(401).json({ status: "Not authorized" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch plants" });
    }
  }

  if (req.method === "POST") {
    try {
      if (session) {
        const plantData = req.body;
        const newPlant = await Plant.create(plantData);
        return res
          .status(201)
          .json({ status: "Plant created", plant: newPlant });
      } else {
        return res.status(401).json({ status: "Not authorized" });
      }
    } catch (error) {
      return res.status(400).json({ error: "Failed to create plant" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
