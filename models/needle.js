import mongoose from "mongoose";

const needleShema = mongoose.Schema({
  name: String,
  shortName: String,
  overview: String,
  imageUrl: String,
  numbers: Array
});

export default mongoose.model("needle", needleShema);
