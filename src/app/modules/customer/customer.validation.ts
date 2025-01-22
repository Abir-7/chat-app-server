import { z } from "zod";

export const zodCustomerSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(1, "Name is required"),
    contactNo: z.number(),
    address: z.string().min(1, "Address is required"),
  })
  .strict();
