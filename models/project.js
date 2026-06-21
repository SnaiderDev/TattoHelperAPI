// models/project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: String,
  overview: String
});

export default mongoose.model("Project", projectSchema);
