import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      unique: true,
      required: true
    },

    description: {
      type: String,
      default: null
    },

    settings: {
      type: Object,
      default: {}
    },

    image_url: {
      type: String,
      default: ""
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Workspace", workspaceSchema);
