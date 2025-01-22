import { Types } from "mongoose";

export interface ICustomer {
  email: string;
  name: string;
  contactNo: number;
  address: string;
  user: Types.ObjectId;
}
