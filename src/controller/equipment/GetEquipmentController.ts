import Elysia, { t } from "elysia";

export const GetEquipmentController = (app: Elysia) =>
  app
    .get(
      "/",
      ({ query }) => {
        return query;
      },
      {
        query: t.Object({
          query: t.Optional(t.String()),
          type: t.Optional(t.String()),
          sortBy: t.Optional(t.String()),
          limit: t.String({ default: "10" }),
          offset: t.String({default: "0"}),
        }),
      },
    )
    .get("/:id", ({ params }) => {
      return params.id;
    });
