import { drizzle } from "drizzle-orm/neon-serverless";
import { neonConfig, Pool } from "@neondatabase/serverless";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import log from "encore.dev/log";
import "dotenv/config";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

export const sql = new SQLDatabase("url", {
  migrations: "./migrations",
});

console.log({ env: process.env.DATABASE_URL, db: sql.connectionString });
const url = process.env.DATABASE_URL || sql.connectionString;
log.info(`Using database: ${url}`);

export const client = new Pool({ connectionString: url });

export const db = drizzle(client);
