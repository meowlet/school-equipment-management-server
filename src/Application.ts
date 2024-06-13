import Elysia from "elysia";
import { GetEquipmentController } from "./controller/equipment/GetEquipmentController";

export const Application = (app: Elysia) =>
  app.group("/equipment", (app) => app.use(GetEquipmentController));
