import Elysia from "elysia";
import { GetEquipmentController } from "./controller/equipment/GetEquipmentController";
import { CreateEquipmentController } from "./controller/equipment/CreateEquipmentController";
import { SignInController } from "./controller/auth/SignInController";
import { SignUpController } from "./controller/auth/SignUpController";

export const Application = (app: Elysia) =>
  app
    .group("/equipment", (app) =>
      app.use(GetEquipmentController).use(CreateEquipmentController),
    )
    .group("/auth", (app) => app.use(SignInController).use(SignUpController));
