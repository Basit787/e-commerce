import { type Context, type Next } from "hono";
import { auth } from "../lib/auth.js";

export const middleware = async (c: Context, next: Next) => {
  try {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      c.set("user", null);
      c.set("session", null);
      return next();
    }

    c.set("user", session.user);
    c.set("session", session.session);
    await next();
    return c.json({ session });
  } catch (error) {
    return c.json({ error: "Error in middleware" }, 400);
  }
};
