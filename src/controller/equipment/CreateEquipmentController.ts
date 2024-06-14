import Elysia, { t } from "elysia";
import { Status } from "../../util/Enum";
import { EquipmentRepository } from "../../repository/EquipmentRepository";
import { Equipment } from "../../model/Equipment";
import { Types } from "mongoose";

export const CreateEquipmentController = (app: Elysia) =>
  app.post(
    "/",
    async ({ body }) => {
      const equipmentRepository = new EquipmentRepository("userID");
      const equipment = new Equipment({
        equipmentName: body.name,
        description: body.description,
        status: body.status,
        currentLocationId: new Types.ObjectId(body.location),
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
