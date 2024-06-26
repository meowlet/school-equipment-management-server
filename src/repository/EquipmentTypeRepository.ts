import { EquipmentType } from "../model/EquipmentType";
import User from "../model/User";
import { IEquipmentType, IRole } from "../util/Entity";
import { Resource, Action } from "../util/Enum";
import { AuthorizationError, ForbiddenError } from "../util/Error";
import { JsonResponse } from "../util/JsonResponse";

export class EquipmentTypeRepository {
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

  async createType(type: IEquipmentType) {
    const nigger = await EquipmentType.create(type);
    console.log(nigger);
  }

  async getTypes() {
    return new JsonResponse(await EquipmentType.find()).processData();
  }
}
