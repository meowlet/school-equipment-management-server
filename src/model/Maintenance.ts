import { Schema, model } from "mongoose";
import { IMaintenance } from "../util/Entity";

const maintenanceSchema = new Schema<IMaintenance>(
  {
    equipmentId: { type: Schema.Types.ObjectId, ref: "Equipment" },
    maintenanceDate: { type: Date, required: true },
    notes: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Maintenance = model<IMaintenance>(
  "Maintenance",
  maintenanceSchema,
);
