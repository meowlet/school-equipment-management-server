import { Role } from "../model/Role";
import User from "../model/User";
import { IRole } from "../util/Entity";
import { Resource, Action } from "../util/Enum";
import { AuthorizationError, ForbiddenError } from "../util/Error";

export class RoleRepository {
  private userID: string;

  constructor(userID: string) {
    this.userID = userID;
  }

  async getUser() {
    const user = await User.findOne({ _id: this.userID }).populate<{
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

  async createRole(role: IRole) {
    await Role.create(role);
  }
  async getRoles() {
    return Role.find();
  }
}
