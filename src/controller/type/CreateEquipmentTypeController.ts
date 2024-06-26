import Elysia, { t } from "elysia";
import { AuthPlugin } from "../../plugin/AuthPlugin";
import { Location } from "../../model/Location";
import { Supplier } from "../../model/Supplier";
import { EquipmentType } from "../../model/EquipmentType";

export const CreateEquipmentTypeController = (app: Elysia) =>
  app.use(AuthPlugin).post(
    "/",
    async ({ body, equipmentTypeRepository }) => {
      const type = new EquipmentType({
        typeName: body.name,
        typeCode: body.code,
        description: body.description,
      });
      equipmentTypeRepository.createType(type);
    },
    {
      body: t.Object({
        name: t.String(),
        code: t.String(),
        description: t.String(),
      }),
    },
  );
