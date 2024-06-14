import Elysia from "elysia";
import { GetEquipmentController } from "./controller/equipment/GetEquipmentController";
import { CreateEquipmentController } from "./controller/equipment/CreateEquipmentController";

export const Application = (app: Elysia) =>
  app.group("/equipment", (app) =>
    app.use(GetEquipmentController).use(CreateEquipmentController),
  );
