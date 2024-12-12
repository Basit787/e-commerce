import { validationMiddleware } from "../middleware/validation.middleware.js";
import { Hono } from "hono";
import * as userController from "../controller/users.controller.js";
import { UserSchema } from "../zod/userSchema.js";

export const userRoutes = new Hono();

userRoutes.get("/", userController.getAllUsers);
userRoutes.get("/:id", userController.getSingleUser);
userRoutes.delete("/:id", userController.deleteUser);
userRoutes.put(
  "/:id",
  validationMiddleware(UserSchema),
  userController.updateUser
);
