import Elysia, { t } from "elysia";
import { Status } from "../../util/Enum";
import { EquipmentRepository } from "../../repository/EquipmentRepository";
import { Equipment } from "../../model/Equipment";
import { Types } from "mongoose";
import { AuthPlugin } from "../../plugin/AuthPlugin";
import { Location } from "../../model/Location";

export const CreateLocationController = (app: Elysia) =>
  app.use(AuthPlugin).post(
    "/",
    async ({ body, locationRepository }) => {
      const location = new Location({
        locationName: body.name,
        description: body.description,
      });
      locationRepository.createLocation(location);
    },
    {
      body: t.Object({
        name: t.String(),
        description: t.String(),
      }),
    },
  );
