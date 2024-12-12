import { Hono } from "hono";
import { userRoutes } from "./users.routes.js";
// import { productRoutes } from "./products.routes.js";

export const routes = new Hono();

routes.route("/users", userRoutes);
// routes.route("/products", productRoutes);
    