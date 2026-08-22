"use client";

import { useEffect, useState } from "react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { createClient } from "@/lib/supabase/client";

export default function UsersPage() {
  const supabase = createClient();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, [supabase]);

  return (
    <>
      <AdminTopbar title="Users" />
      <div className="p-6">
        <div className="max-w-2xl rounded-md bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-display text-base font-semibold text-ink">
            Admin users
          </h2>
          <div className="flex items-center justify-between rounded-md border border-ink/10 p-4">
            <div>
              <p className="font-medium text-ink">{email ?? "Loading..."}</p>
              <p className="text-xs text-ink/50">Role: Admin</p>
            </div>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Active
            </span>
          </div>
          <p className="mt-4 text-xs text-ink/40">
            This site currently runs with a single admin account. To add more
            staff logins later, invite them from the Supabase dashboard under
            Authentication → Users, then give this page a proper invite flow.
          </p>
        </div>
      </div>
    </>
  );
}
