// import { Hono } from "hono";
// import * as productController from "../controller/products.controller.js";
// import { validationMiddleware } from "../middleware/validation.middleware.js";
// import { ProductSchema } from "../zod/productSchema.js";

// export const productRoutes = new Hono();

// productRoutes.get("/", productController.getAllProducts);
// productRoutes.post(
//   "/",
//   validationMiddleware(ProductSchema),
//   productController.addProduct
// );
// productRoutes.get("/:id", productController.getSingleProduct);
// productRoutes.delete("/:id", productController.deleteProduct);
// productRoutes.put(
//   "/:id",
//   validationMiddleware(ProductSchema),
//   productController.updatProduct
// );
