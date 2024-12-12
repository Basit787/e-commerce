import "dotenv/config";
import { Hono } from "hono";
import { routes } from "./routes/index.js";
import { auth } from "./lib/auth.js";
import { serve } from "@hono/node-server";

const app = new Hono();
const port = Number(process.env.PORT!);

//call all defined routes here
app.route("/api", routes);

//better auth api
app.on(["POST", "GET"], "/api/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

serve({
  fetch: app.fetch,
  port,
});
