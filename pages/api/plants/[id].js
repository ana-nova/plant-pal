import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plants";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "GET") {
    const plant = await Plant.findById(id);
    res.status(200).json(plant);
  }

  if (req.method === "PUT") {
    const updatedPlant = await Plant.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPlant);
  }

  if (req.method === "DELETE") {
    await Plant.findByIdAndDelete(id);
    res.status(200).json({ message: "Plant deleted" });
  }
}
