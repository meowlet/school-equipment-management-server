import { Schema, model } from "mongoose";
import { ILoanHistory } from "../util/Entity";

const loanHistorySchema = new Schema<ILoanHistory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    equipmentId: { type: Schema.Types.ObjectId, ref: "Equipment" },
    loanDate: { type: Date, required: true },
    returnDate: { type: Date },
  },
  {
    timestamps: true,
  },
);

export const LoanHistory = model<ILoanHistory>(
  "LoanHistory",
  loanHistorySchema,
);
