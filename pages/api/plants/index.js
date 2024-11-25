import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plant";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  await dbConnect();

  const session = await getServerSession(req, res, authOptions);
  const token = session ? await getToken({ req }) : null;
  const userId = token?.sub;

  if (req.method === "GET") {
    const plants = await Plant.find({ owner: userId }).sort({ createdAt: -1 });
    res.status(200).json(plants);
  }

  if (req.method === "POST") {
    try {
      if (session) {
        const plantData = req.body;
        const newPlant = await Plant.create({ ...plantData, owner: userId });
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
