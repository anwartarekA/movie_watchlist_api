import catchAsync from "../config/utils/catchAsync.js";
import AppError from "../config/utils/appError.js";
import { prisma } from "./../config/db/connectDB.js";
export const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  //check if email exist in database
  const exist = await prisma.user.findUnique({
    where: { email },
  });
  if (exist)
    return next(new AppError("duplicated email, use another one", 400));
});
