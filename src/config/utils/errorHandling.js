const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};
const sendProError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: "something went wrong",
    });
  }
};
const errorHandling = (err, req, res, next) => {
  ((err.status = err.status || "error"),
    (err.statusCode = err.statusCode || 500));
  if (process.env.NODE_ENV === "development") sendDevError(err, res);
  else if (process.env.NODE_ENV === "production") sendProError(err, res);
};
export default errorHandling;
