import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// ✅ Ensure DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  throw new Error("❌ Missing DATABASE_URL environment variable");
}

// ✅ Add SSL in production
const connectionString =
  process.env.NODE_ENV === "production"
    ? `${process.env.DATABASE_URL}?sslmode=require`
    : process.env.DATABASE_URL;

// ✅ Create Neon client
const sql = neon(connectionString);

// ✅ Initialize Drizzle with schema (this is the correct signature)
export const db = drizzle(sql, { schema });

// ✅ Optional: direct client for raw queries
export async function getClient() {
  return neon(connectionString);
}

// ✅ Optional: re-export schema for easier imports elsewhere
export * from "./schema";
