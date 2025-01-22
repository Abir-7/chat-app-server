import mongoose from "mongoose";
import { ICustomer } from "../customer/customer.interface";
import Customer from "../customer/customer.model";
import { ICreateCustomer, IUser } from "./user.interface";
import { User } from "./user.model";

// const createUser = async (userData: ICreateCustomer) => {
//   const { password, customerData } = userData;
//   const { email } = customerData;
//   console.log(password, "hh", customerData);

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();
//     const createUser = await User.create([{ email, password }], { session });
//     const createCustomer = await Customer.create(
//       [
//         {
//           ...customerData,
//           user: createUser[0]._id,
//         },
//       ],
//       { session }
//     );

//     await session.commitTransaction();
//     session.endSession();

//     return createCustomer[0];
//   } catch (error) {
//     console.log(error);
//     await session.abortTransaction();
//     session.endSession();
//     throw new AppError(500, "Failed to Create User");
//   }
// };

const createUser = async (userData: ICreateCustomer) => {
  const { password, customerData } = userData;
  const { email } = customerData;
  console.log(password, "hh", customerData);

  const createUser = await User.create({ email, password });
  const createCustomer = await Customer.create({
    ...customerData,
    user: createUser._id,
  });

  return createCustomer;
};

export const UserServices = {
  createUser,
};
