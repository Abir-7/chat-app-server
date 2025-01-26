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
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../config");
exports.userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [6, "Password must be at least 8 characters long."],
        select: false, // Don't include password in query results by default
    },
    passwordChangeAt: {
        type: Date,
    },
    role: {
        type: String,
        enum: user_constant_1.userRole,
        default: "USER",
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    id: false,
    toJSON: { virtuals: true },
});
exports.userSchema.virtual("customer", {
    ref: "Customer", // The model to reference
    localField: "_id", // The field in the User model that we're matching with
    foreignField: "user", // The field in the Customer model that references the User
    justOne: true, // Whether we expect a single document (true) or an array (false)
});
exports.userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //check user
        const isExist = yield exports.User.findOne({ email: this.email });
        if (isExist) {
            throw new AppError_1.default(400, "User already exist");
        }
        //password hash
        this.password = yield bcrypt_1.default.hash(this.password.trim(), Number(config_1.config.bcrypt_salt_rounds));
        next();
    });
});
exports.userSchema.statics.passwordMatch = function (hashedPass, password) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(hashedPass, password.trim());
        return yield bcrypt_1.default.compare(hashedPass, password);
    });
};
exports.User = (0, mongoose_1.model)("User", exports.userSchema);
