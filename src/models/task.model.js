import mongoose from "mongoose";
import { TaskStatus, TaskType, Priority } from "./enum.model.js";

const taskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: null
    },

    status: {
      type: String,
      enum: TaskStatus,
      default: "TODO"
    },

    type: {
      type: String,
      enum: TaskType,
      default: "TASK"
    },

    priority: {
      type: String,
      enum: Priority,
      default: "MEDIUM"
    },

    assigneeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    due_date: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
