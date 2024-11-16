import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plants";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    try {
      console.log("for GET in api id: ", id);
      const plant = await Plant.findById(id);

      if (!plant) {
        response.status(404).json({ status: "Plant Not Found" });
        return;
      }

      response.status(200).json(plant);
    } catch (error) {
      response
        .status(500)
        .json({ status: "Failed to fetch plant.", error: error.message });
    }
    return;
  }

  if (request.method === "PUT") {
    try {
      const updatePlant = request.body;
      const updatedPlant = await Plant.findByIdAndUpdate(id, updatePlant, {
        new: true,
      });

      if (!updatedPlant) {
        response.status(404).json({ status: "Plant Not Found" });
        return;
      }

      response
        .status(200)
        .json({ status: "Plant successfully updated!", plant: updatedPlant });
    } catch (error) {
      response
        .status(400)
        .json({ status: "Failed to update plant.", error: error.message });
    }
    return;
  }

  if (request.method === "DELETE") {
    try {
      const deletedPlant = await Plant.findByIdAndDelete(id);

      if (!deletedPlant) {
        response.status(404).json({ status: "Plant Not Found" });
        return;
      }

      response.status(200).json({ status: "Plant successfully deleted." });
    } catch (error) {
      response
        .status(500)
        .json({ status: "Failed to delete plant.", error: error.message });
    }
    return;
  }
}
