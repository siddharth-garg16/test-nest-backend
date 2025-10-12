import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { config } from "../config/env.config";
import { UserType } from "../common/enums/user-type.enum";

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
        values: [UserType.ADMIN, UserType.TEACHER, UserType.STUDENT],
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

userSchema.pre("save", async function (next): Promise<void> {
  // if password was not changed, avoid re-hashing
  if (this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.validatePassword = async function (
  passwordByUser: string
): Promise<boolean> {
  const isPasswordCorrect = await bcrypt.compare(passwordByUser, this.password);
  return isPasswordCorrect;
};

// userSchema.methods.getJWT = async function () {
//   const token = await jwt.sign({ _id: this._id }, config.jwtSecret, {
//     expiresIn: "7d",
//   });
//   return token;
// };

userSchema.methods.generateAccessToken = function (): string {
  const ACCESS_TOKEN_SECRET = config.accessTokenSecret as string;

  return jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      emailId: this.emailId,
      userType: this.userType,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    } as object
  );
};

userSchema.methods.generateRefreshToken = function (): string {
  const REFRESH_TOKEN_SECRET = config.refreshTokenSecret as string;

  return jwt.sign(
    {
      _id: this._id,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    } as object
  );
};

export const User = mongoose.model("User", userSchema);
