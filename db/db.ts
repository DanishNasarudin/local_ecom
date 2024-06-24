import { Pool } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

if (process.env.NODE_ENV === "production") {
  console.log("db: Running Production Mode.");
  // config({ path: ".prod.env" });
  config({ path: ".dev.env" });
} else {
  console.log("db: Running Development Mode.");
  config({ path: ".dev.env" });
}

const { DATABASE_URL } = process.env;
// console.log(DATABASE_URL);

const pool = new Pool({ connectionString: DATABASE_URL, ssl: true });
const db = drizzle(pool, { schema });

export default db;
