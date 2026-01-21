import { email, z } from "zod";
const validateLoginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .nonempty()
    .nonoptional()
    .minLength(5, "minimum length for password is 5 characters"),
});

export default validateLoginSchema;
