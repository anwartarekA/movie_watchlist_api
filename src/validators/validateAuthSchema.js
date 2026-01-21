import { email, z } from "zod";
export const validateLoginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(5, "minimum length for password is 5 characters")
    .nonempty(),
});
export const validateRegisterSchema = z.object({
  name: z
    .string()
    .nonempty()
    .min(3, "min length for name is 5 chars")
    .max(20, "name is very large"),
  email: z.email(),
  password: z
    .string()
    .nonempty()
    .min(5, "minimum length for password is 5 characters"),
});
