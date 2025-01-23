import catchAsync from "../../utils/shared/catchAsync";
import sendResponse from "../../utils/shared/sendResponse";
import { CustomerService } from "./customer.service";

const getAllCustomers = catchAsync(async (req, res) => {
  const customers = await CustomerService.getAllCustomers();

  sendResponse(res, {
    data: customers,
    statusCode: 200,
    success: true,
    message: "All customers fetched successfully",
  });
});

export const CustomerController = {
  getAllCustomers,
};
