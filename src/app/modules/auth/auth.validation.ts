import { z } from "zod";

export const zodUserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
