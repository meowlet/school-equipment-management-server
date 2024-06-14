import { Schema, model } from "mongoose";
import { IRole } from "../util/Entity";
import { Resource, Action } from "../util/Enum";

const roleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    permissions: [
      {
        resource: {
          type: String,
          enum: Object.values(Resource),
          required: true,
        },
        actions: [
          { type: String, enum: Object.values(Action), required: true },
        ],
        _id: false,
      },
    ],
  },
  { timestamps: true },
);

export const Role = model<IRole>("Role", roleSchema);
