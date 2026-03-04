import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: ["Fullname field is required!", true],
    },
    email: {
      type: String,
      unique: true,
      required: ["Email address field is required!", true],
      lowercase: true,
    },
    password: {
      type: String,
      required: ["Password field is required!", true],
    },
    confirmPassword: {
      type: String,
      // required: ["Confirm password field is required!", true],
    },
  },

  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
