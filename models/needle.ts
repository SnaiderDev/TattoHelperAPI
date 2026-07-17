import mongoose from "mongoose";

const needleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  overview: { type: String, required: true },
  imageUrl: { type: String, required: false },
  numbers: [{ type: Number }],
});

export default mongoose.model("needle", needleSchema);
