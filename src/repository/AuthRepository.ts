import User from "../model/User";
import { IUser } from "../util/Entity";
import bcrypt from "bcrypt";

export class AuthRepository {
  async signUp(user: IUser) {
    console.log(user);
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

export const authRepository = new AuthRepository();
