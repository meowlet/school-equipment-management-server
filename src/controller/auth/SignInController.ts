import Elysia, { t } from "elysia";
import { authRepository } from "../../repository/AuthRepository";
import jwt from "@elysiajs/jwt";
import { UserRepository } from "../../repository/UserRepository";

export const SignInController = (app: Elysia) =>
  app.guard(
    {
      body: t.Object({
        identifier: t.String(),
        password: t.String(),
      }),
    },
    (app) =>
      app
        .use(
          jwt({
            name: "jwt",
            secret: process.env.JWT_SECRET || "The ultimate secret",
            exp: 2 * 86400,
          }),
        )
        .derive(async ({ body, jwt }) => {
          const user = await authRepository.signIn(
            body.identifier,
            body.password,
          );

          return {
            token: await jwt.sign({
              userId: user._id.toString(),
            }),
          };
        })
        .post("/signin", ({ token }) => {
          console.log(token);
        }),
  );
