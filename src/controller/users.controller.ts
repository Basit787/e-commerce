import { eq } from "drizzle-orm";
import type { Context } from "hono";
import { db } from "../db/index.js";
import { user } from "../db/schema.js";

export const getAllUsers = async (c: Context) => {
  try {
    const result = await db.select().from(user);
    if (!result.length) return c.json({ message: "No user added" }, 400);
    return c.json({ message: "Successfully fetched users", result }, 200);
  } catch (error) {
    return c.json({ error: `Failed to get users: ${error}` }, 400);
  }
};

export const getSingleUser = async (c: Context) => {
  const id = c.req.param("id");
  try {
    const result = await db.select().from(user).where(eq(user.id, id));
    if (!result.length)
      return c.json({ message: `User not found ${result}` }, 400);
    return c.json({ message: "User fetched successfully", data: result }, 200);
  } catch (error) {
    return c.json({ error: `Failed to get user details: ${error}` }, 400);
  }
};

export const deleteUser = async (c: Context) => {
  const id = c.req.param("id");
  try {
    const result = await db.delete(user).where(eq(user.id, id)).returning();
    if (!result.length)
      return c.json({ message: `User not found ${result}` }, 400);
    return c.json({ message: "User deleted successfully", result }, 200);
  } catch (error) {
    return c.json({ error: `Failed to delete user: ${error}` }, 400);
  }
};

export const updateUser = async (c: Context) => {
  const id = c.req.param("id");
  const updatedData = await c.req.json();
  try {
    const result = await db
      .update(user)
      .set(updatedData)
      .where(eq(user.id, id))
      .returning();
    if (!result.length)
      return c.json({ message: `User not found ${result}` }, 400);
    return c.json({ message: "User updated successfully", result });
  } catch (error) {
    return c.json({ error: `Failed to update user: ${error}` }, 400);
  }
};
