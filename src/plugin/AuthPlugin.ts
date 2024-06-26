import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import { EquipmentRepository } from "../repository/EquipmentRepository";
import { AuthorizationError } from "../util/Error";
import { RoleRepository } from "../repository/RoleRepository";
import { LocationRepository } from "../repository/LocationRepository";
import { SupplierRepository } from "../repository/SupplierRepository";
import { EquipmentTypeRepository } from "../repository/EquipmentTypeRepository";

export const AuthPlugin = async (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET || "The ultimate secret",
      }),
    )
    .derive(async ({ headers, jwt }) => {
      const token = headers["authorization"]?.replace("Bearer ", "");
      if (!token) {
        throw new AuthorizationError("Token not found");
      }

      const decodedToken = await jwt.verify(token);
      if (!decodedToken) {
        throw new AuthorizationError("Error authenticating");
      } else {
        console.log(decodedToken);
        return {
          equipmentRepository: new EquipmentRepository(
            decodedToken.userId as string,
          ),
          roleRepository: new RoleRepository(decodedToken.userID as string),
          locationRepository: new LocationRepository(
            decodedToken.userId as string,
          ),
          supplierRepository: new SupplierRepository(
            decodedToken.userId as string,
          ),
          equipmentTypeRepository: new EquipmentTypeRepository(
            decodedToken.userId as string,
          ),
        };
      }
    });
