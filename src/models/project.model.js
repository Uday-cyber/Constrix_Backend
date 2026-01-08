import mongoose from "mongoose";
import { Priority, ProjectStatus } from "./enum.model.js";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: null
    },

    priority: {
      type: String,
      enum: Priority,
      default: "MEDIUM"
    },

    status: {
      type: String,
      enum: ProjectStatus,
      default: "ACTIVE"
    },

    start_date: Date,
    end_date: Date,

    team_lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
