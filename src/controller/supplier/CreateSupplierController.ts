import Elysia, { t } from "elysia";
import { AuthPlugin } from "../../plugin/AuthPlugin";
import { Location } from "../../model/Location";
import { Supplier } from "../../model/Supplier";

export const CreateSupplierController = (app: Elysia) =>
  app.use(AuthPlugin).post(
    "/",
    async ({ body, supplierRepository }) => {
      const supplier = new Supplier({
        name: body.name,
        email: body.email,
        phoneNumber: body.phoneNumber,
        address: body.address,
        website: body.website,
        notes: body.notes,
      });
      supplierRepository.createSupplier(supplier);
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        phoneNumber: t.String(),
        address: t.String(),
        website: t.Optional(t.String()),
        notes: t.Optional(t.String()),
      }),
    },
  );
