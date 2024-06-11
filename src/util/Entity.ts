import { Schema } from "mongoose";

// Interface for Users
export interface IUser {
  username: string;
  passwordHash: string;
  fullName?: string;
  email?: string;
  roleId: Schema.Types.ObjectId;
}

// Interface for Equipment
export interface IEquipment {
  equipmentName: string;
  description?: string;
  status: string;
  currentLocationId: Schema.Types.ObjectId;
}

// Interface for LoanHistory
export interface ILoanHistory {
  userId: Schema.Types.ObjectId;
  equipmentId: Schema.Types.ObjectId;
  loanDate: Date;
  returnDate?: Date;
}

// Interface for Maintenance
export interface IMaintenance {
  equipmentId: Schema.Types.ObjectId;
  maintenanceDate: Date;
  notes?: string;
}

// Interface for Locations
export interface ILocation {
  locationName: string;
  description?: string;
}

// Interface for Roles
export interface IRole {
  roleName: string;
  description?: string;
}
