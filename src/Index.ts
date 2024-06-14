import { Elysia } from "elysia";
import { Application } from "./Application";
import "./database/MongoDBSetup";

const app = new Elysia().use(Application).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
