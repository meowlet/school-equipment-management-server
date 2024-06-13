import { Types } from "mongoose";

// Interface for Users
export interface IUser {
  username: string;
  passwordHash: string;
  fullName?: string;
  email?: string;
  roleId: Types.ObjectId;
}

// Interface for Equipment
export interface IEquipment {
  equipmentName: string;
  description?: string;
  status: string;
  currentLocationId: Types.ObjectId;
  supplier: Types.ObjectId;
  type: Types.ObjectId;
}

// Interface for Supplier
export interface ISupplier {
  name: string;              
  email: string;           
  phoneNumber: string;    
  address: string;       
  website?: string;     
  notes?: string;      
}

//Interface for EquipmentType 
export interface IEquipmentType {
  typeCode: string;
  typeName: string;
  description?: string
}

// Interface for LoanHistory
export interface ILoanHistory {
  userId: Types.ObjectId;
  equipmentId: Types.ObjectId;
  loanDate: Date;
  returnDate?: Date;
}

// Interface for Maintenance
export interface IMaintenance {
  equipmentId: Types.ObjectId;
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
