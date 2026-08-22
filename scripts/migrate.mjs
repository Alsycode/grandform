import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import pg from "pg";
import { config } from "dotenv";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
config({ path: path.join(root, ".env.local") });

const dbPassword = process.env.SUPABASE_DB_PASSWORD;
const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!dbPassword || !projectUrl) {
  console.error("Missing SUPABASE_DB_PASSWORD or NEXT_PUBLIC_SUPABASE_URL in .env.local");
  process.exit(1);
}

const projectRef = new URL(projectUrl).hostname.split(".")[0];

// This project's Supavisor pooler lives in ap-south-1 (found via scripts/find-region.mjs).
// The direct db.<ref>.supabase.co host is IPv6-only on new projects and unreachable
// from this network, so we go through the pooler exclusively.
const connectionStrings = [
  `postgresql://postgres.${projectRef}:${encodeURIComponent(dbPassword)}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres`,
];

const sqlPath = path.join(root, "supabase", "schema.sql");
const sql = readFileSync(sqlPath, "utf8");

let lastErr;
for (const connectionString of connectionStrings) {
  const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });
  try {
    console.log(`Connecting via ${connectionString.replace(dbPassword, "***")}...`);
    await client.connect();
    console.log("Connected. Applying supabase/schema.sql...");
    await client.query(sql);
    console.log("Schema applied successfully.");
    await client.end();
    process.exit(0);
  } catch (err) {
    lastErr = err;
    console.error(`Failed via this connection: ${err.message}`);
    await client.end().catch(() => {});
  }
}

console.error("All connection attempts failed.");
console.error(lastErr);
process.exit(1);
