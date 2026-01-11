import jwt from "jsonwebtoken";
import AppError from "./appError.js";
import { prisma } from "../db/connectDB.js";
const protect = async (req, res, next) => {
  let token;
  // check if token exist
  if (
    req.headers.authorization ||
    req.headers.authorization?.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];
  else if (req.cookies.token) token = req.cookies.token;
  if (!token) return next(new AppError("jwt must be provided", 500));
  // verify token
  const decoded = jwt.verify(token, process.env.SECRET_JWT);
  if (!decoded)
    return next(new AppError("unauthenticated user or token expired", 401));
  // get user by id
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });
  if (!user)
    return next(
      new AppError(
        "unauthenticated user, no user found with that id, user deleted",
        401,
      ),
    );
  req.user = user;
  next();
};
export default protect;
