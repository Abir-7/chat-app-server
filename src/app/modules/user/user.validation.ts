import { z } from "zod";

import { zodCustomerSchema } from "../customer/customer.validation";

// export const zodUserSchema = z.object({
//   // Transforms email to lowercase
//   password: z
//     .string()
//     .min(6, "Password must be at least 6 characters long")
//     .max(128, "Password must be at most 128 characters long"),
//   email: z
//     .string()
//     .email("Invalid email address")
//     .min(1, "Email is required")
//     .max(255, "Email must be at most 255 characters")
//     .transform((email) => email.toLowerCase()),
//   role: z.enum([User_Role.user, User_Role.admin]).default(User_Role.user),
//   isBlocked: z.boolean().default(false),
//   isDeleted: z.boolean().default(false),
//   isVerified: z.boolean().default(false),
// });

export const zodCreateUserSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password should be at least 6 characters long"),
    customerData: zodCustomerSchema,
  })
  .strict();
