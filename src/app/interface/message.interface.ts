import { ObjectId } from "mongodb";

interface Customer {
  _id: ObjectId;
  email: string;
  name: string;
  contactNo: number;
  address: string;
  user: ObjectId;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface Sender {
  _id: ObjectId;
  email: string;
  role: string;
  isBlocked: boolean;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  customer: Customer;
}

export interface IMessage {
  chat: ObjectId;
  sender: Sender;
  content: string;
  _id: ObjectId;
  __v: number;
}
