import { EquipmentType } from "../model/EquipmentType";
<<<<<<< HEAD
import User from "../model/User";
import { IEquipmentType, IRole } from "../util/Entity";
import { Resource, Action } from "../util/Enum";
import { AuthorizationError, ForbiddenError } from "../util/Error";
import { JsonResponse } from "../util/JsonResponse";
=======
import { IEquipmentType } from "../util/Entity";
>>>>>>> 63db85c1a8d7424fce3d07456a6406dfed5a1373

export class EquipmentTypeRepository {
  public userId: string;

  constructor(userID: string) {
    this.userId = userID;
  }

<<<<<<< HEAD
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

=======
>>>>>>> 63db85c1a8d7424fce3d07456a6406dfed5a1373
  async createType(type: IEquipmentType) {
    const nigger = await EquipmentType.create(type);
    console.log(nigger);
  }

  async getTypes() {
<<<<<<< HEAD
    return new JsonResponse(await EquipmentType.find()).processData();
=======
    return EquipmentType.find();
>>>>>>> 63db85c1a8d7424fce3d07456a6406dfed5a1373
  }
}
