import { Model } from "mongoose";
import { ICustomer } from "../customer/customer.interface";
import User_Role from "./user.constant";

export type IUserRole = "USER" | "ADMIN";

export interface IUser {
  id: string;
  email: string;
  password: string;
  passwordChangeAt?: Date;
  role: IUserRole;
  isBlocked: boolean;
  isDeleted: boolean;
  isVerified: boolean;
  customer: any;
}

export interface ICreateCustomer {
  image: string;
  password: string;
  customerData: ICustomer;
}
export interface IUserModel extends Model<IUser> {
  passwordMatch(hashedPass: string, password: string): Promise<boolean>;
}
export type TUserRole = keyof typeof User_Role;
