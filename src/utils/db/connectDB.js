import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["error", "query", "warn", "info"]
      : ["error"],
});
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("connected to database successfully");
  } catch (error) {
    console.error("Error", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  console.log("disconnected successfully");
  await prisma.$disconnect();
};
export { prisma, connectDB, disconnectDB };
