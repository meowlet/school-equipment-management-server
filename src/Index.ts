import { Elysia } from "elysia";
import { Application } from "./Application";
import "./database/MongoDBSetup";
import { ErrorPlugin } from "./plugin/ErrorPlugin";

const app = new Elysia();
app.use(ErrorPlugin).use(Application).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
