import { Supplier } from "../model/Supplier";
import User from "../model/User";
import { IRole, ISupplier } from "../util/Entity";
import { Action, Resource } from "../util/Enum";
import { AuthorizationError, ForbiddenError } from "../util/Error";
import { JsonResponse } from "../util/JsonResponse";

export class SupplierRepository {
  public userId: string;

  constructor(userId: string) {
    this.userId = userId;
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

  async createSupplier(location: ISupplier) {
    Supplier.create(location);
  }

  async getSuppliers() {
    return new JsonResponse(await Supplier.find()).processData();
  }
}
