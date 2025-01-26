"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRouter = void 0;
const express_1 = require("express");
const customer_controller_1 = require("./customer.controller");
const auth_1 = __importDefault(require("../../middleware/Auth/auth"));
const router = (0, express_1.Router)();
router.get("/get-customer", (0, auth_1.default)("USER"), customer_controller_1.CustomerController.getAllCustomers);
exports.CustomerRouter = router;
