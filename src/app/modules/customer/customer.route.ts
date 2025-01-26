import { Router } from "express";
import { CustomerController } from "./customer.controller";
import auth from "../../middleware/Auth/auth";

const router = Router();
router.get("/get-customer", auth("USER"), CustomerController.getAllCustomers);
export const CustomerRouter = router;
