import { drizzle } from "drizzle-orm/postgres-js";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import "dotenv/config";
import postgres from "postgres";

export const sql = new SQLDatabase("url", {
  migrations: "./migrations",
});

const connectionString = sql.connectionString;

const client = postgres(connectionString);

export const db = drizzle(client);
