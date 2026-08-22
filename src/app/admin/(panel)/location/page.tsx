"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { createClient } from "@/lib/supabase/client";

type Form = {
  address_line_1: string;
  address_line_2: string;
  map_query: string;
};

export default function LocationSettingsPage() {
  const supabase = createClient();
  const [form, setForm] = useState<Form>({
    address_line_1: "",
    address_line_2: "",
    map_query: "",
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from("site_content")
      .select("address_line_1, address_line_2, map_query")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data) setForm(data);
        setLoading(false);
      });
  }, [supabase]);

  const handleSave = async () => {
    await supabase.from("site_content").update(form).eq("id", 1);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <AdminTopbar title="Location" />
      <div className="p-6">
        <div className="max-w-2xl rounded-md bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-display text-base font-semibold text-ink">
            Restaurant location
          </h2>
          {loading ? (
            <p className="text-sm text-ink/40">Loading...</p>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-ink/70">
                  Address line 1
                </label>
                <input
                  value={form.address_line_1}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address_line_1: e.target.value }))
                  }
                  className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm outline-none focus:border-maroon"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-ink/70">
                  Address line 2
                </label>
                <input
                  value={form.address_line_2}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address_line_2: e.target.value }))
                  }
                  className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm outline-none focus:border-maroon"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-ink/70">
                  Google Maps search query
                </label>
                <input
                  value={form.map_query}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, map_query: e.target.value }))
                  }
                  placeholder="e.g. Iringalakuda Kator Bypass Road 680121"
                  className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm outline-none focus:border-maroon"
                />
                <p className="mt-1 text-xs text-ink/40">
                  Used to embed the map and the &quot;Get Directions&quot; link on the
                  website.
                </p>
              </div>
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
