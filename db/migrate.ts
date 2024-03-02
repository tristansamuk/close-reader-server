import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./db";

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "./db/migrations" });
    console.log("Migration successful!");
  } catch (error) {
    console.error(error);
  }
};

main();
