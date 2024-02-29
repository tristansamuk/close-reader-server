import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
// import { users } from "./schema";

const connectionString = process.env.DATABASE_URI!;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);

export default db;
