import bcrypt from "bcrypt";
import User from "../model/User";
import { IUser } from "../util/Entity";
import { AuthorizationError, ConflictedError } from "../util/Error";

export class AuthRepository {
  async signUp(user: IUser) {
    console.log(user);
    try {
      await User.create(user);
    } catch (error: any) {
      if (error.name === "MongoServerError" && error.code === 11000) {
        throw new ConflictedError("Username or email already exists!");
      }
    }
  }

  async signIn(identifier: string, password: string) {
    const existingUser = await User.findOne({
      $or: [{ userName: identifier }, { email: identifier }],
    });

    if (!existingUser) {
      throw new AuthorizationError(`User not found!`);
    }

    const passwordMatched = bcrypt.compareSync(
      password,
      existingUser.passwordHash,
    );

    if (passwordMatched) {
      return existingUser;
    } else {
      throw new AuthorizationError("Password does not match!");
    }
  }
}

export const authRepository = new AuthRepository();
