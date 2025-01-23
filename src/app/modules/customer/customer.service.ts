import Customer from "./customer.model";

const getAllCustomers = async () => {
  return await Customer.find();
};
export const CustomerService = {
  getAllCustomers,
};
