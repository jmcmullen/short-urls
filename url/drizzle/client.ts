import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import { secret } from "encore.dev/config";
import log from "encore.dev/log";
import "dotenv/config";
import postgres from "postgres";
import { env } from "process";

const sql = new SQLDatabase("url", {
  migrations: "./migrations",
});

const url = process.env.DATABASE_URL || sql.connectionString;
log.info(`Using database: ${url}`);

const client = neon(url);

export const db = drizzle(client);
