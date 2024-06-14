import { Equipment } from "../model/Equipment";
import User from "../model/User";
import { IEquipment, IRole } from "../util/Entity";
import { Resource, Action } from "../util/Enum";

export class EquipmentRepository {
  private userID: string;

  constructor(userID: string) {
    this.userID = userID;
  }

  async getUser() {
    const user = await User.findOne({ _id: this.userID }).populate<{
      roles: IRole[];
    }>("roles");

    if (!user) {
      throw new Error("User not found");
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

    throw new Error("Permission denied");
  }

  async createEquipment(equipment: IEquipment) {
    Equipment.create(equipment);
  }

  async getEquipment(equipmentID: string) {
    return Equipment.findOne({ _id: equipmentID });
  }
}
