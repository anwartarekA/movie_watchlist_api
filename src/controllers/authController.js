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
  if (!email || !password)
    return next(new AppError("provide email or password", 400));
  // get user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });
  // if (!user) return next(new AppError("unauthenticated user", 401));
  // compare two passwords
  if (!user || !(await bcrypt.compare(password, user.password)))
    return next(
      new AppError("unauthenticated user, invalid email or password", 401),
    );
  // create token
  const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT, {
    expiresIn: process.env.EXPIRES_IN,
  });
  createTokenAndSendCookie(res, user);
  res.status(200).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
});
export const logout = catchAsync(async (req, res, next) => {
  res.cookie("token", "", {
    expires: new Date(Date.now() + 1 * 1000),
    sameSite: "Strict",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({
    status: "loged out",
  });
});
