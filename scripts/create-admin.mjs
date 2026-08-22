import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
config({ path: path.join(root, ".env.local") });

const email = process.argv[2];
if (!email) {
  console.error("Usage: node scripts/create-admin.mjs <email>");
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
  redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/set-password`,
});

if (error) {
  console.error("Invite failed:", error.message);
  process.exit(1);
}

const userId = data.user.id;
console.log(`Invited ${email} (user id ${userId}). Check inbox for the set-password link.`);

const { error: profileErr } = await supabase
  .from("admin_profiles")
  .upsert({ id: userId, role: "admin" });

if (profileErr) {
  console.error("Failed to create admin_profiles row:", profileErr.message);
  process.exit(1);
}

console.log("admin_profiles row created.");
