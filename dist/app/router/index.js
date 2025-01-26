"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const refreshToken_router_1 = require("../modules/refreshToken/refreshToken.router");
const customer_route_1 = require("../modules/customer/customer.route");
const chat_route_1 = require("../modules/chat/chat.route");
const message_route_1 = require("../modules/chat/message/message.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    { path: "/user", route: user_route_1.UserRouter },
    { path: "/user", route: customer_route_1.CustomerRouter },
    { path: "/auth", route: auth_route_1.AuthRouter },
    { path: "/token", route: refreshToken_router_1.TokenRouter },
    { path: "/chat", route: chat_route_1.ChatRouter },
    { path: "/chat", route: message_route_1.MessageRouter },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
