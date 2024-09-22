import { api, APIError } from "encore.dev/api";
import { randomBytes } from "node:crypto";
import { db, sql } from "./drizzle/client";
import schema from "./drizzle/schema";
import { eq } from "drizzle-orm";

interface URL {
  id: string; // short-form URL id
  url: string; // complete URL, in long form
}

interface ShortenParams {
  url: string; // the URL to shorten
}

// shorten shortens a URL.
export const shorten = api(
  { expose: true, auth: false, method: "POST", path: "/url" },
  async ({ url }: ShortenParams): Promise<URL> => {
    const id = randomBytes(6).toString("base64url");
    await db.insert(schema.url).values([{ id, url }]);
    return { id, url };
  }
);

export const test = api(
  { expose: true, auth: false, method: "GET", path: "/test" },
  async (): Promise<{ url: string }> => {
    return { url: sql.connectionString };
  }
);

// Get retrieves the original URL for the id.
export const get = api(
  { expose: true, auth: false, method: "GET", path: "/url/:id" },
  async ({ id }: { id: string }): Promise<URL> => {
    const result = await db
      .select()
      .from(schema.url)
      .where(eq(schema.url.id, id));

    if (!result[0]) throw APIError.notFound("url not found");
    return result[0];
  }
);

interface ListResponse {
  urls: URL[];
}

// List retrieves all URLs.
export const list = api(
  { expose: false, method: "GET", path: "/url" },
  async (): Promise<ListResponse> => {
    const urls = await db.select().from(schema.url);
    return { urls };
  }
);
