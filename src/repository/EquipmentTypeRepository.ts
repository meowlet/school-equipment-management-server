import { EquipmentType } from "../model/EquipmentType";
import { IEquipmentType } from "../util/Entity";

export class EquipmentTypeRepository {
  async createType(type: IEquipmentType) {
    await EquipmentType.create(type);
  }

  async getTypes() {
    return EquipmentType.find();
  }
}
