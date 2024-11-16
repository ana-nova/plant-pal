import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plants";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const plants = await Plant.find();

      if (!plants || plants.length === 0) {
        response.status(404).json({ status: "No plants found." });
        return;
      }

      response.status(200).json(plants);
    } catch (error) {
      response
        .status(500)
        .json({ status: "Failed to fetch plants.", error: error.message });
    }
    return;
  }

  if (request.method === "POST") {
    try {
      const plantsData = request.body;

      const createdPlant = await Plant.create(plantsData);

      response
        .status(201)
        .json({ status: "Plant created successfully.", plant: createdPlant });
    } catch (error) {
      response
        .status(400)
        .json({ status: "Failed to create plant.", error: error.message });
    }
    return;
  }
}
