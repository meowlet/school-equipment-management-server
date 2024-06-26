import Elysia from "elysia";
import { GetEquipmentController } from "./controller/equipment/GetEquipmentController";
import { CreateEquipmentController } from "./controller/equipment/CreateEquipmentController";
import { SignInController } from "./controller/auth/SignInController";
import { SignUpController } from "./controller/auth/SignUpController";
import { AddRoleController } from "./controller/role/AddRoleController";
import { CreateLocationController } from "./controller/location/CreateLocationController";
import { CreateSupplierController } from "./controller/supplier/CreateSupplierController";
import { CreateEquipmentTypeController } from "./controller/type/CreateEquipmentTypeController";
import { GetEquipmentTypeController } from "./controller/type/GetEquipmentTypeController";

export const Application = new Elysia()
  .group("/equipment", (app) =>
    app.use(GetEquipmentController).use(CreateEquipmentController),
  )
  .group("/location", (app) => app.use(CreateLocationController))
  .group("/supplier", (app) => app.use(CreateSupplierController))
  .group("/type", (app) =>
    app.use(CreateEquipmentTypeController).use(GetEquipmentTypeController),
  )
  .group("/auth", (app) => app.use(SignInController).use(SignUpController))
  .group("/role", (app) => app.use(AddRoleController));
