import { model, Schema } from "mongoose";
import { IUser, IUserModel } from "./user.interface";
import { userRole } from "./user.constant";
import AppError from "../../errors/AppError";
import bcrypt from "bcryptjs";
import { config } from "../../config";
export const userSchema = new Schema<IUser, IUserModel>(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password must be at least 8 characters long."],
      select: false, // Don't include password in query results by default
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: userRole,
      default: "USER",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    id: false,
    toJSON: { virtuals: true },
  }
);

userSchema.virtual("customer", {
  ref: "Customer", // The model to reference
  localField: "_id", // The field in the User model that we're matching with
  foreignField: "user", // The field in the Customer model that references the User
  justOne: true, // Whether we expect a single document (true) or an array (false)
});

userSchema.pre("save", async function (next) {
  //check user
  const isExist = await User.findOne({ email: this.email });
  if (isExist) {
    throw new AppError(400, "User already exist");
  }
  //password hash
  this.password = await bcrypt.hash(
    this.password.trim(),
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.statics.passwordMatch = async function (
  hashedPass: string,
  password: string
): Promise<boolean> {
  console.log(hashedPass, password.trim());
  return await bcrypt.compare(hashedPass, password);
};

export const User = model<IUser, IUserModel>("User", userSchema);
