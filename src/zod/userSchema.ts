import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 charcters" }),
  age: z.number(),
  email: z.string().email({ message: "Invalid Email format" }),
  role: z.string().default("user"),
});

export type UserType = z.infer<typeof UserSchema>;
