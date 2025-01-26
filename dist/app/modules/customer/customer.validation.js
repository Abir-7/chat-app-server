"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodCustomerSchema = void 0;
const zod_1 = require("zod");
exports.zodCustomerSchema = zod_1.z
    .object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().min(1, "Name is required"),
    contactNo: zod_1.z.number(),
    address: zod_1.z.string().min(1, "Address is required"),
})
    .strict();
