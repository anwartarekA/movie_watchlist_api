import { prisma, connectDB, disconnectDB } from "./src/config/db/connectDB.js";
connectDB();
import express from "express";
import errorHandling from "./src/config/utils/errorHandling.js";
import userRouter from "./src/routes/authRoutes.js";
const app = express();
const port = 3000;
app.use(express.json());
app.use(errorHandling);
app.use("/auth", userRouter);
const server = app.listen(port, () =>
  console.log(`server is listening on port ${port}`),
);
// handle uncaught exception
process.on("uncaughtException", async (err) => {
  console.log("UNCAUGHT EXCEPTION", err);
  await disconnectDB();
  process.exit(1);
});
// handle unhandle rejection
process.on("unhandledRejection", () => {
  console.log("unhandled rejection");
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
// handle segnal term
process.on("SIGTERM", () => {
  console.log("signal term occured. server shut down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
