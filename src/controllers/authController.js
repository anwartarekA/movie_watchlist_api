import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import catchAsync from "../config/utils/catchAsync.js";
import AppError from "../config/utils/appError.js";
import { prisma } from "./../config/db/connectDB.js";
import createTokenAndSendCookie from "../config/utils/createJwtAndSendCookie.js";
export const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  //check if email exist in database
  const exist = await prisma.user.findUnique({
    where: { email },
  });
  if (exist)
    return next(new AppError("duplicated email, use another one", 400));
  // hash password
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await prisma.user.create({
    data: { name, email, password: hashPassword },
  });
  // create token
  const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT, {
    expiresIn: process.env.EXPIRES_IN,
  });
  createTokenAndSendCookie(res, user);
  res.status(201).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
});
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
});
