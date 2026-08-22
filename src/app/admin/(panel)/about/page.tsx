"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { createClient } from "@/lib/supabase/client";

export default function AboutSettingsPage() {
  const supabase = createClient();
  const [aboutText, setAboutText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from("site_content")
      .select("about_text")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        setAboutText(data?.about_text ?? "");
        setLoading(false);
      });
  }, [supabase]);

  const handleSave = async () => {
    await supabase
      .from("site_content")
      .update({ about_text: aboutText })
      .eq("id", 1);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <AdminTopbar title="About Us" />
      <div className="p-6">
        <div className="max-w-2xl rounded-md bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-display text-base font-semibold text-ink">
            About Us section text
          </h2>
          {loading ? (
            <p className="text-sm text-ink/40">Loading...</p>
          ) : (
            <>
              <textarea
                rows={6}
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm outline-none focus:border-maroon"
              />
              <button
                onClick={handleSave}
                className="mt-4 inline-flex items-center gap-2 rounded-sm bg-maroon-deep px-5 py-2.5 text-sm font-medium text-white hover:bg-maroon"
              >
                <Save size={15} /> {saved ? "Saved!" : "Save Changes"}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
