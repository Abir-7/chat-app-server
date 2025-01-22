import { model, Schema } from "mongoose";
import { ICustomer } from "./customer.interface";

const CustomerSchema = new Schema<ICustomer>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    contactNo: { type: Number, required: true },
    address: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

// Create the model
const Customer = model<ICustomer>("Customer", CustomerSchema);

export default Customer;
