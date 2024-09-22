import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import { DRIZZLE_BASE_PATH } from "./config";

const sqlDb = new SQLDatabase("url");
const client = postgres(sqlDb.connectionString);

export const db = drizzle(client);

await migrate(db, {
  migrationsFolder: `${DRIZZLE_BASE_PATH}/migrations`,
});
