import mongoose from "mongoose";
import "./Plant";
const { Schema } = mongoose;

const reminderSchema = new Schema({
  plantId: {
    type: Schema.Types.ObjectId,
    ref: "Plant",
    required: true,
  },
  taskType: { type: String, required: true },
  dueDate: { type: Date, required: true },
  interval: { type: String, default: "" },
  isDone: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  owner: { type: String, required: true },
});

const Reminder =
  mongoose.models.Reminder || mongoose.model("Reminder", reminderSchema);

export default Reminder;
