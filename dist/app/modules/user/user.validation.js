"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodCreateUserSchema = void 0;
const zod_1 = require("zod");
const customer_validation_1 = require("../customer/customer.validation");
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
exports.zodCreateUserSchema = zod_1.z
    .object({
    password: zod_1.z
        .string()
        .min(6, "Password should be at least 6 characters long"),
    customerData: customer_validation_1.zodCustomerSchema,
})
    .strict();
