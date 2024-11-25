import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plant";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ status: "Not authorized" });
  }

  if (req.method === "GET") {
    try {
      const plant = await Plant.findById(id);

      if (!plant) {
        return res.status(404).json({ error: "Plant not found" });
      }

      return res.status(200).json(plant);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch plant" });
    }
  }

  if (req.method === "PUT") {
    try {
      const updatedPlant = await Plant.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedPlant) {
        return res.status(404).json({ error: "Plant not found" });
      }
      return res.status(200).json(updatedPlant);
    } catch (error) {
      return res.status(400).json({ error: "Failed to update plant" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const plant = await Plant.findById(id);

      if (!plant) {
        return res.status(404).json({ error: "Plant not found" });
      }

      if (!plant.owner) {
        return res
          .status(403)
          .json({ error: "Plants without an owner cannot be deleted" });
      }

      await Plant.findByIdAndDelete(id);

      return res.status(200).json({ message: "Plant deleted successfully" });
    } catch (error) {
      console.error("Error deleting plant:", error);
      return res.status(500).json({ error: "Failed to delete plant" });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
