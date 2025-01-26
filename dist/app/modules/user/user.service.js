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
exports.UserServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const customer_model_1 = __importDefault(require("../customer/customer.model"));
const user_model_1 = require("./user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, customerData, image } = userData;
    const { email } = customerData;
    console.log(userData);
    const session = yield mongoose_1.default.startSession();
    let createdCustomer;
    try {
        session.startTransaction();
        const createUser = yield user_model_1.User.create([{ email, password }], { session });
        const userId = createUser[0]._id;
        createdCustomer = yield customer_model_1.default.create([
            Object.assign(Object.assign({}, customerData), { user: userId, image }),
        ], { session });
        yield session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        console.error("Error occurred while creating user and customer:", error);
        yield session.abortTransaction();
        throw new AppError_1.default(500, "Failed to create user and customer");
    }
    return createdCustomer[0]; // Return the created customer document
});
// const createUser = async (payload: ICreateCustomer) => {
//   console.log(payload);
//   const result = await User.create(payload);
//   return result;
// };
const getAllUserForChat = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userEmail);
    const users = yield user_model_1.User.find({
        role: "USER",
        email: { $ne: userEmail },
    }).populate("customer");
    return users;
});
exports.UserServices = {
    createUser,
    getAllUserForChat,
};
