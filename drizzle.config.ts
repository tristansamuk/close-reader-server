import type { Config } from "drizzle-kit";

import dotenv from "dotenv";
dotenv.config();
const connectionString = process.env.DATABASE_URI;

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: `${connectionString}`,
  },
} satisfies Config;
