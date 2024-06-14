import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import { EquipmentRepository } from "../repository/EquipmentRepository";

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
        throw new Error("Please authenticate");
      }
      const decodedToken = await jwt.verify(token);
      if (!decodedToken) {
        throw new Error("Error authenticating");
      } else {
        return {
          equipmentRepository: new EquipmentRepository(
            decodedToken.userID as string,
          ),
        };
      }
    });
