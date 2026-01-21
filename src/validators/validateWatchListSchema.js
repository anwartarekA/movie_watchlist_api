import { z } from "zod";
export const validateAddWatchListSchema = z.object({
  movie_id: z.string().uuid(),
  status: z.enum(["PLANNED", "WATCHING", "COMPELETED", "DROPPED"], {
    error: () => ({
      message: "status must be from: PLANNED, WATCHING, COMPELETED, DROPPED",
    }),
  }),
  rating: z.coerce
    .number("rating must be a number")
    .int("rating must be an integer")
    .min(1, "rating is between 1 and 10")
    .max(10, "rating is between 1 and 10")
    .optional(),
  notes: z.string().optional(),
});
