import { Router } from "express";
import { UserRouter } from "../modules/user/user.route";
import { AuthRouter } from "../modules/auth/auth.route";
import { TokenRouter } from "../modules/refreshToken/refreshToken.router";
import { MessageRouter } from "../modules/message/message.route";
import { CustomerRouter } from "../modules/customer/customer.route";

const router = Router();
const moduleRoutes = [
  { path: "/user", route: UserRouter },
  { path: "/user", route: CustomerRouter },
  { path: "/auth", route: AuthRouter },
  { path: "/token", route: TokenRouter },
  { path: "/message", route: MessageRouter },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
