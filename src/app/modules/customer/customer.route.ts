import { Router } from "express";
import { CustomerController } from "./customer.controller";

const router = Router();
router.get("/get-customer", CustomerController.getAllCustomers);
export const CustomerRouter = router;
