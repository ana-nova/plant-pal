import mongoose from "mongoose";

const { Schema } = mongoose;

const ReminderSchema = new Schema({
  plantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plant",
    required: true,
  },
  taskType: { type: String, required: true },
  dueDate: { type: Date, required: true },
  interval: { type: String, default: null },
  isDone: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Reminder =
  mongoose.models.Reminder || mongoose.model("Reminder", ReminderSchema);

export default Reminder;
