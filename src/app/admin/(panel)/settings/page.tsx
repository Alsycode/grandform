"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { createClient } from "@/lib/supabase/client";

export default function GeneralSettingsPage() {
  const supabase = createClient();
  const [hours, setHours] = useState("");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from("site_content")
      .select("hours")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        setHours(data?.hours ?? "");
        setLoading(false);
      });
  }, [supabase]);

  const handleSave = async () => {
    await supabase.from("site_content").update({ hours }).eq("id", 1);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <AdminTopbar title="General Settings" />
      <div className="p-6">
        <div className="max-w-2xl rounded-md bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-display text-base font-semibold text-ink">
            Opening hours
          </h2>
          {loading ? (
            <p className="text-sm text-ink/40">Loading...</p>
          ) : (
            <div className="space-y-4">
              <input
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm outline-none focus:border-maroon"
                placeholder="Open 12:00 PM – 12:00 AM"
              />
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-sm bg-maroon-deep px-5 py-2.5 text-sm font-medium text-white hover:bg-maroon"
              >
                <Save size={15} /> {saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
