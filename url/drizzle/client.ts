import { drizzle as devDrizzle } from "drizzle-orm/postgres-js";
import { drizzle as prodDrizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import postgres from "postgres";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import "dotenv/config";
import { secret } from "encore.dev/config";

const env = secret("DB_ENV")();
import log from "encore.dev/log";

const sql = new SQLDatabase("url", {
  migrations: "./migrations",
});

const loadProd = () => {
  log.info(sql.connectionString);
  const client = neon(sql.connectionString);
  return prodDrizzle(client);
};

const loadDev = () => {
  log.info(sql.connectionString);
  const client = postgres(sql.connectionString);
  return devDrizzle(client);
};

export const db = env === "local" ? loadDev() : loadProd();
