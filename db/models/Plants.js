import mongoose from "mongoose";

const { Schema } = mongoose;

const plantSchema = new Schema({
  name: { type: String, required: true },
  botanicalName: { type: String, required: true },
  imageUrl: { type: String, required: false, default: "" },
  waterNeed: { type: String, required: true },
  lightNeed: { type: String, required: true },
  fertiliserSeason: {
    type: [String],
    enum: ["Spring", "Summer", "Winter", "Fall"],
    required: false,
  },
  description: { type: String, required: false, default: "" },
  location: { type: String, required: false },
  humidity: { type: String, required: false },
  temperature: { type: String, required: false },
  airDraftIntolerance: { type: String, required: false },
  catPoisonous: { type: String, required: false },
  dogPoisonous: { type: String, required: false },
  careLevel: { type: String, required: false },
  isFavourite: { type: Boolean, default: false },
});

const Plant = mongoose.models.Plant || mongoose.model("Plant", plantSchema);

export default Plant;
