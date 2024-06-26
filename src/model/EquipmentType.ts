import { Schema, model } from "mongoose";
import { IEquipmentType } from "../util/Entity";

const equipmentTypeSchema = new Schema<IEquipmentType>(
  {
    typeName: { type: String, required: true },
    typeCode: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  },
);

export const EquipmentType = model<IEquipmentType>(
  "EquipmentType",
  equipmentTypeSchema,
);
