import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client — bypasses Row Level Security entirely.
 * Server-only: never import this from a Client Component or expose it to the browser.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
