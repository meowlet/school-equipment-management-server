import { Schema, model } from "mongoose";
import { ILocation } from "../util/Entity";

const locationSchema = new Schema<ILocation>(
  {
    locationName: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  },
);

export const LocationModel = model<ILocation>("Location", locationSchema);
