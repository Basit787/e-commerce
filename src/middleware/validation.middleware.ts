import type { Context, Next } from "hono";
import type { z } from "zod";

export const validationMiddleware = (schema: z.ZodSchema) => {
  return async (c: Context, next: Next) => {
    try {
      const userData = await c.req.json();
      schema.parse(userData);
      return next();
    } catch (error) {
      return c.json({ error: error });
    }
  };
};
