import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plants";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const plants = await Plant.find();
    res.status(200).json(plants);
  }

  if (req.method === "POST") {
    const newPlant = await Plant.create(req.body);
    res.status(201).json(newPlant);
  }
}
