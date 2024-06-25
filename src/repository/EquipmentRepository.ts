import { NotFoundError } from "elysia";
import { Equipment } from "../model/Equipment";
import User from "../model/User";
import { IEquipment, IRole } from "../util/Entity";
import { Resource, Action } from "../util/Enum";
import { AuthorizationError, ForbiddenError } from "../util/Error";
import { EquipmentQuery } from "../util/QueryInterface";
import { JsonResponse } from "../util/JsonResponse";

export class EquipmentRepository {
  public userId: string;

  constructor(userID: string) {
    this.userId = userID;
  }

  async getUser() {
    const user = await User.findOne({ _id: this.userId }).populate<{
      roles: IRole[];
    }>("roles");

    if (!user) {
      throw new AuthorizationError("User not found");
    }

    return user;
  }

  async checkPermission(resource: Resource, action: Action) {
    const user = await this.getUser();

    for (const role of user.roles) {
      const permission = role.permissions.find(
        (p) => p.resource === resource && p.actions.includes(action),
      );
      if (permission) return;
    }

    throw new ForbiddenError("Permission denied");
  }

  async createEquipment(equipment: IEquipment) {
    Equipment.create(equipment);
  }

  async getEquipments(query: EquipmentQuery): Promise<IEquipment[]> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const mongooseQuery: Record<string, any> = {};

    if (query.equipmentName) {
      mongooseQuery.equipmentName = {
        $regex: query.equipmentName,
        $options: "i",
      };
    }

    if (query.status) {
      mongooseQuery.status = query.status;
    }

    if (query.location) {
      mongooseQuery.location = { $in: query.location };
    }

    if (query.createdBy) {
      mongooseQuery.createdBy = query.createdBy;
    }

    if (query.supplier) {
      mongooseQuery.supplier = { $in: query.supplier };
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      mongooseQuery.price = {};

      if (query.minPrice !== undefined) {
        mongooseQuery.price.$gte = query.minPrice;
      }

      if (query.maxPrice !== undefined) {
        mongooseQuery.price.$lte = query.maxPrice;
      }
    }

    if (query.type) {
      mongooseQuery.type = query.type;
    }

    const equipments = await Equipment.find(mongooseQuery)
      .skip(skip)
      .limit(limit)
      .populate("type")
      .populate("location")
      .populate("supplier");

    if (!equipments) {
      throw new NotFoundError("No equipment found");
    }
    return new JsonResponse(equipments).processData();
  }
  async getEquipmentByID(equipmentID: string) {
    const equipment = await Equipment.findOne({ _id: equipmentID });
    if (!equipment) {
      throw new NotFoundError("Equipment not found");
    }
    return new JsonResponse(equipment).processData();
  }
}
