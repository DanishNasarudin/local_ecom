import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

if (process.env.NODE_ENV === "production") {
  console.log("Running Production Mode.");
  config({ path: ".prod.env" });
} else {
  console.log("Running Development Mode.");
  config({ path: ".dev.env" });
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
    ssl: true,
  },
});
