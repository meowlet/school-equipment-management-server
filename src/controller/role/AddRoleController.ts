import Elysia, { t } from "elysia";
import { AuthPlugin } from "../../plugin/AuthPlugin";
import { Resource, Action } from "../../util/Enum";

export const AddRoleController = new Elysia().use(AuthPlugin).post(
  "/",
  async ({ roleRepository, body }) => {
    await roleRepository.createRole(body);
  },
  {
    body: t.Object({
      name: t.String(),
      description: t.String(),
      permissions: t.Array(
        t.Object({
          resource: t.Enum(Resource),
          actions: t.Array(t.Enum(Action)),
        }),
      ),
    }),
  },
);
