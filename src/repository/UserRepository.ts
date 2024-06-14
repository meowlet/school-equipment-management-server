import User from "../model/User";
import { IUser } from "../util/Entity";
import bcrypt from "bcrypt";

export class UserRepository {
  async signUp(user: IUser) {
    await User.create(user);
  }

  async signIn(identifier: string, password: string) {
    const existingUser = await User.findOne({
      $or: [{ userName: identifier }, { email: identifier }],
    });

    if (!existingUser) {
      throw new Error(`User not found!`);
    }

    const passwordMatched = bcrypt.compareSync(
      password,
      existingUser.passwordHash,
    );

    if (passwordMatched) {
      return existingUser;
    } else {
      throw new Error("Password does not match!");
    }
  }
}
