import { eq } from "drizzle-orm";
import type { Context } from "hono";
import { db } from "../db/index.js";
import { products } from "../db/schema.js";

export const getAllProducts = async (c: Context) => {
  try {
    const result = await db.select().from(products);
    if (!result.length) return c.json({ message: "Product not found" }, 400);
    return c.json({ message: "Product fetched successfully", result }, 200);
  } catch (error) {
    return c.json({ message: `Failed to fetched products : ${error}` }, 400);
  }
};

export const addProduct = async (c: Context) => {
  const productData = await c.req.json();
  try {
    const result = await db.insert(products).values(productData).returning();
    return c.json({ message: "Product added successfully", result }, 201);
  } catch (error) {
    return c.json({ message: `Failed to add product : ${error}` }, 400);
  }
};

export const getSingleProduct = async (c: Context) => {
  const id = c.req.param("id");
  try {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.product_id, id));
    if (!result.length) return c.json({ message: "Product not found" }, 400);
    return c.json({ message: "Product fetched successfully", result }, 200);
  } catch (error) {
    return c.json({ message: `Failed to get product details : ${error}` }, 400);
  }
};

export const deleteProduct = async (c: Context) => {
  const id = c.req.param("id");
  try {
    const result = await db
      .delete(products)
      .where(eq(products.product_id, id))
      .returning();
    if (!result.length) return c.json({ message: "Product not found" }, 400);
    return c.json({ message: "Product deleted successfully", result }, 200);
  } catch (error) {
    return c.json({ message: `Failed to delete product : ${error}` }, 400);
  }
};

export const updatProduct = async (c: Context) => {
  const id = c.req.param("id");
  const updatedData = await c.req.json();
  try {
    const result = await db
      .update(products)
      .set(updatedData)
      .where(eq(products.product_id, id))
      .returning();
    if (!result.length) return c.json({ message: "Product not found" }, 400);
    return c.json({ message: "roduct updated successfully", result }, 200);
  } catch (error) {
    return c.json({ message: `Failed to update product : ${error}` }, 400);
  }
};
