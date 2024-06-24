import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

if (process.env.NODE_ENV === "production") {
  console.log("migration: Running Production Mode.");
  // config({ path: ".prod.env" });
  config({ path: ".dev.env" });
} else {
  console.log("migration: Running Development Mode.");
  config({ path: ".dev.env" });
}

const { DATABASE_URL } = process.env;

const db = drizzle(postgres(DATABASE_URL!, { ssl: "require", max: 1 }));

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "./db" });
    console.log("Migration successful.");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};
main();
