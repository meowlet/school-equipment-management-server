import Elysia, { t } from "elysia";
import { AuthPlugin } from "../../plugin/AuthPlugin";
import { JsonResponse } from "../../util/JsonResponse";

export const GetEquipmentController = (app: Elysia) =>
  app
    .use(AuthPlugin)
    .get(
      "/",
      async ({ query, equipmentRepository }) => {
        return new JsonResponse(
          await equipmentRepository.getEquipments(),
        ).processData();
      },
      {
        query: t.Object({
          query: t.Optional(t.String()),
          type: t.Optional(t.String()),
          sortBy: t.Optional(t.String()),
          limit: t.String({ default: "10" }),
          offset: t.String({ default: "0" }),
        }),
      },
    )
    .get("/:id", ({ params }) => {
      return params.id;
    });
