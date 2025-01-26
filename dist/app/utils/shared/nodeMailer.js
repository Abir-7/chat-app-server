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
exports.sendMail = void 0;
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/mailer.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("../../config");
// Load environment variables
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    host: config_1.config.host_email_service,
    port: Number(config_1.config.host_email_service_port),
    secure: false,
    auth: {
        user: config_1.config.host_email,
        pass: config_1.config.host_email_pass,
    },
});
transporter.verify(function (error, _success) {
    if (error) {
        console.error("Email transporter error:", error);
    }
    else {
        console.log("Email transporter is ready");
    }
});
// Send email utility function
const sendMail = (emailOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, subject, text, html } = emailOptions;
    try {
        const info = yield transporter.sendMail({
            from: `"bdCalling" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });
        console.log("Email sent: %s", info.messageId);
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
});
exports.sendMail = sendMail;
