import { EquipmentType } from "../model/EquipmentType";
import { IEquipmentType } from "../util/Entity";

export class EquipmentTypeRepository {
  public userId: string;

  constructor(userID: string) {
    this.userId = userID;
  }

  async createType(type: IEquipmentType) {
    const nigger = await EquipmentType.create(type);
    console.log(nigger);
  }

  async getTypes() {
    return EquipmentType.find();
  }
}
