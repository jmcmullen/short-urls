import { defineConfig } from "drizzle-kit";

export const DRIZZLE_BASE_PATH = "./url/drizzle";

export default defineConfig({
  dialect: "postgresql",
  schema: `${DRIZZLE_BASE_PATH}/schema.ts`,
  out: `${DRIZZLE_BASE_PATH}/migrations`,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    prefix: "timestamp",
  },
});
