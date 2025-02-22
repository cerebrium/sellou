import dotenv from "dotenv";
import { createClient, Client } from "@libsql/client";
import path from "path";
import { scripts } from "./schema/create_db";

dotenv.config();

export async function initialize_db() {
  const db_path = path.join(__dirname, process.env.DATABASE_URL || "posts_db");

  const db: Client = createClient({
    url: `file:${db_path}`,
  });

  // Check if the database has tables
  const result = await db.execute(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
  );

  if (result.rows.length > 0) {
    return db;
  }

  for (const script of scripts) {
    db.execute(script);
  }
  return db;
}
