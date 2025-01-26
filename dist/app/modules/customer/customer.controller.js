"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/shared/sendResponse"));
const customer_service_1 = require("./customer.service");
const getAllCustomers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield customer_service_1.CustomerService.getAllCustomers();
    (0, sendResponse_1.default)(res, {
        data: customers,
        statusCode: 200,
        success: true,
        message: "All customers fetched successfully",
    });
}));
exports.CustomerController = {
    getAllCustomers,
};
