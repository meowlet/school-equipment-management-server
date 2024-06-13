import { Schema, model } from "mongoose";
import { ISupplier } from "../util/Entity";

const supplierSchema = new Schema<ISupplier>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    website: { type: String },
    notes: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Supplier = model<ISupplier>("Supplier", supplierSchema);
