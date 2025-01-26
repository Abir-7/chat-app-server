"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    contactNo: { type: Number, required: true },
    address: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    image: { type: String, required: true },
}, {
    timestamps: true,
});
// Create the model
const Customer = (0, mongoose_1.model)("Customer", CustomerSchema);
exports.default = Customer;
