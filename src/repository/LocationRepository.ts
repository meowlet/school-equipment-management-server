import { NotFoundError } from "elysia";
import { Equipment } from "../model/Equipment";
import User from "../model/User";
import { IEquipment, ILocation, IRole } from "../util/Entity";
import { Resource, Action } from "../util/Enum";
import { AuthorizationError, ForbiddenError } from "../util/Error";
import { Location } from "../model/Location";
import { JsonResponse } from "../util/JsonResponse";

export class LocationRepository {
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

  async createLocation(location: ILocation) {
    Location.create(location);
  }

  async getLocations() {
    return new JsonResponse(await Location.find()).processData();
  }
}
