import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Add global type for Prisma
declare global {
  /* eslint-disable no-var */
  var prisma: PrismaClient | undefined;
}

// Ensure Prisma client is a singleton
function getPrismaClient() {
  if (global.prisma) {
    return global.prisma;
  }
  
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL must be set in environment variables");
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  
  const client = new PrismaClient({ adapter });
  
  if (process.env.NODE_ENV !== "production") {
    global.prisma = client;
  }
  
  return client;
}

const prisma = getPrismaClient();

export default prisma;
