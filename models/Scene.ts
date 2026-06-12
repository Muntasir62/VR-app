import mongoose from "mongoose";

const SceneSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    objects: [
      {
        id: Number,
        type: {
          type: String,
          enum: ["cube", "sphere"],
        },
        position: [Number],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Scene ||
  mongoose.model("Scene", SceneSchema);