import { Types } from "mongoose";

interface BaseQuery {
  page?: number;
  limit?: number;
}

export interface EquipmentQuery extends BaseQuery {
  equipmentName?: string;
  status?: string[];
  location?: string[];
  createdBy?: string[];
  supplier?: string[];
  minPrice?: number;
  maxPrice?: number;
  type?: string[];
}

export interface UserQuery extends BaseQuery {
  userName?: string;
  fullName?: string;
  email?: string;
  roleId?: string;
}

export interface SupplierQuery extends BaseQuery {
  name?: string;
  email?: string;
  phoneNumber?: string;
}

export interface EquipmentTypeQuery extends BaseQuery {
  typeName?: string;
  typeCode?: string;
}

export interface LocationQuery extends BaseQuery {
  locationName?: string;
}

export interface RoleQuery extends BaseQuery {
  name?: string;
}
