import Elysia, { NotFoundError, t } from "elysia";
import { AuthPlugin } from "../../plugin/AuthPlugin";
import { JsonResponse } from "../../util/JsonResponse";
import { EquipmentQuery } from "../../util/QueryInterface";
import { Types } from "mongoose";

export const GetEquipmentController = (app: Elysia) =>
  app
    .use(AuthPlugin)
    .get(
      "/",
      async ({ query, equipmentRepository }) => {
        const equipmentQuery: EquipmentQuery = {
          equipmentName: query.query,
          status: query.status ? query.status.split(",") : undefined,
          type: query.type ? query.type.split(",") : undefined,
          supplier: query.supplier ? query.supplier.split(",") : undefined,
          location: query.location ? query.location.split(",") : undefined,
          createdBy: query.createdBy ? query.createdBy.split(",") : undefined,
          minPrice: query.minPrice ? parseInt(query.minPrice, 10) : undefined,
          maxPrice: query.maxPrice ? parseInt(query.maxPrice, 10) : undefined,
          page: query.page ? parseInt(query.page, 10) : undefined,
          limit: query.limit ? parseInt(query.limit, 10) : undefined,
        };
        return await equipmentRepository.getEquipments(equipmentQuery);
      },
      {
        query: t.Object({
          query: t.Optional(t.String()),
          type: t.Optional(t.String()),
          status: t.Optional(t.String()),
          location: t.Optional(t.String()),
          supplier: t.Optional(t.String()),
          createdBy: t.Optional(t.String()),
          minPrice: t.Optional(t.String()),
          maxPrice: t.Optional(t.String()),
          sortBy: t.Optional(t.String()),
          limit: t.String({ default: "10" }),
          page: t.String({ default: "1" }),
        }),
      },
    )
    .get("/:id", async ({ params, equipmentRepository }) => {
      return await equipmentRepository.getEquipmentByID(params.id);
    });
