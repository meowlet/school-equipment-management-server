import Elysia, { NotFoundError, t } from "elysia";
import { AuthPlugin } from "../../plugin/AuthPlugin";
import { JsonResponse } from "../../util/JsonResponse";
import { EquipmentQuery } from "../../util/QueryInterface";
import { Types } from "mongoose";

export const GetEquipmentTypeController = (app: Elysia) =>
  app.use(AuthPlugin).get("/", async ({ equipmentTypeRepository }) => {
    return await equipmentTypeRepository.getTypes();
  });
