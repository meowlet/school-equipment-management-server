import { Elysia } from "elysia";
import { Application } from "./Application";
import "./database/MongoDBSetup";
import { getErrorMessage } from "./util/Error";

const app = new Elysia()
  .onError(({ error }) => {
    return new Response(getErrorMessage(error));
  })
  .use(Application)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
