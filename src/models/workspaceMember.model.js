import mongoose from "mongoose";
import { WorkspaceRole } from "./enum.model.js";

const workspaceMemberSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true
    },

    message: {
      type: String,
      default: ""
    },

    role: {
      type: String,
      enum: WorkspaceRole,
      default: "MEMBER"
    }
  },
  { timestamps: true }
);

workspaceMemberSchema.index(
  { userId: 1, workspaceId: 1 },
  { unique: true }
);

export default mongoose.model("WorkspaceMember", workspaceMemberSchema);
