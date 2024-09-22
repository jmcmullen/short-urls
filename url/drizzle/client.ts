import { drizzle as devDrizzle } from "drizzle-orm/postgres-js";
import { drizzle as prodDrizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import postgres from "postgres";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import "dotenv/config";

const sql = new SQLDatabase("url", {
  migrations: "./migrations",
});

const loadProd = () => {
  const client = neon(sql.connectionString);
  return prodDrizzle(client);
};

const loadDev = () => {
  const client = postgres(sql.connectionString);
  return devDrizzle(client);
};

export const db =
  process.env.NODE_ENV === "development" ? loadDev() : loadProd();
