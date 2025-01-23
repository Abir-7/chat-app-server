import { Router } from "express";
import { UserRouter } from "../modules/user/user.route";
import { AuthRouter } from "../modules/auth/auth.route";
import { TokenRouter } from "../modules/refreshToken/refreshToken.router";

const router = Router();
const moduleRoutes = [
  { path: "/user", route: UserRouter },
  { path: "/auth", route: AuthRouter },
  { path: "/token", route: TokenRouter },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
