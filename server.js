import { prisma, connectDB, disconnectDB } from "./src/utils/db/connectDB.js";
connectDB();
import express from "express";
const app = express();
const port = 3000;
app.get("/", (req, res) => res.end("hello"));
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
