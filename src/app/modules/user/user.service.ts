import mongoose from "mongoose";
import { ICustomer } from "../customer/customer.interface";
import Customer from "../customer/customer.model";
import { ICreateCustomer, IUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/AppError";

const createUser = async (userData: ICreateCustomer) => {
  const { password, customerData, image } = userData;
  const { email } = customerData;
  console.log(userData);
  const session = await mongoose.startSession();
  let createdCustomer;

  try {
    session.startTransaction();

    const createUser = await User.create([{ email, password }], { session });
    const userId = createUser[0]._id;
    createdCustomer = await Customer.create(
      [
        {
          ...customerData,
          user: userId,
          image,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    console.error("Error occurred while creating user and customer:", error);
    await session.abortTransaction();
    throw new AppError(500, "Failed to create user and customer");
  }

  return createdCustomer[0]; // Return the created customer document
};

// const createUser = async (payload: ICreateCustomer) => {
//   console.log(payload);
//   const result = await User.create(payload);

//   return result;
// };

export const UserServices = {
  createUser,
};
