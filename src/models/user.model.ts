import * as mongoose from "mongoose";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from "bcrypt"
import { config } from "./env.config";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    userType: {
      type: String,
      enum: {
        values: ["teacher", "student", "admin"],
        message: "{VALUE} is not supported",
      },
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ firstName: 1, lastName: 1 });

userSchema.methods.getJWT = async function () {
  const token = await jwt.sign({ _id: this._id }, config.jwtSecret, {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordByUser) {
  const isPassword = await bcrypt.compare(passwordByUser, this.password);
  return isPassword;
};

export const User = mongoose.model("User", userSchema);

