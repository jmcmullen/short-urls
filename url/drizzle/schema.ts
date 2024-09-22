import { pgTable, text } from "drizzle-orm/pg-core";

export const url = pgTable("url", {
  id: text("id").primaryKey(),
  url: text("url").notNull(),
});

export default { url };
