import Elysia, { t } from "elysia";
import { Status } from "../../util/Enum";
import { EquipmentRepository } from "../../repository/EquipmentRepository";
import { Equipment } from "../../model/Equipment";
import { Types } from "mongoose";
import { AuthPlugin } from "../../plugin/AuthPlugin";

export const CreateEquipmentController = (app: Elysia) =>
  app.use(AuthPlugin).post(
    "/",
    async ({ body, equipmentRepository }) => {
      const equipment = new Equipment({
        equipmentName: body.name,
        description: body.description,
        status: body.status,
        location: new Types.ObjectId(body.location),
        createdBy: equipmentRepository.userId,
        supplier: new Types.ObjectId(body.supplier),
        price: body.price,
        type: new Types.ObjectId(body.type),
      });
      equipmentRepository.createEquipment(equipment);
    },
    {
      body: t.Object({
        name: t.String(),
        description: t.String(),
        status: t.Enum(Status),
        location: t.String(),
        supplier: t.String(),
        price: t.Number(),
        type: t.String(),
      }),
    },
  );
