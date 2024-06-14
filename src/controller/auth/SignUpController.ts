import Elysia, { t } from "elysia";
import { authRepository } from "../../repository/AuthRepository";
import User from "../../model/User";
import { JsonResponse } from "../../util/JsonResponse";

export const SignUpController = (app: Elysia) =>
  app.post(
    "/signup",
    async ({ body }) => {
      const newUser = new User({
        userName: body.userName,
        email: body.email,
        fullName: body.fullName,
        passwordHash: body.password,
      });

      await authRepository.signUp(newUser);

      return new JsonResponse(newUser).processData();
    },
    {
      body: t.Object({
        userName: t.String(),
        email: t.String(),
        fullName: t.String(),
        password: t.String(),
      }),
    },
  );
