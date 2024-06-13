import { Schema, model } from "mongoose";
import { IEquipment } from "../util/Entity";

const equipmentSchema = new Schema<IEquipment>(
  {
    equipmentName: { type: String, required: true },
    description: { type: String },
    status: { type: String, required: true },
    currentLocationId: { type: Schema.Types.ObjectId, ref: "Location" },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier" },
    type: { type: Schema.Types.ObjectId, ref: "EquipmentType" },
  },
  {
    timestamps: true,
  },
);

export const Equipment = model<IEquipment>("Equipment", equipmentSchema);
