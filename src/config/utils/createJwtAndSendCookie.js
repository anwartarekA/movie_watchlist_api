import jwt from "jsonwebtoken";
const createTokenAndSendCookie = (res, user) => {
  const options = {
    httpOnly: true,
    maxAge: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "production",
    sameSize: "Strict",
  };
  const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT, {
    expiresIn: process.env.EXPIRES_IN,
  });
  res.cookie("token", token, options);
};
export default createTokenAndSendCookie;
