"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { createClient } from "@/lib/supabase/client";

type Form = {
  phone_1: string;
  phone_2: string;
  email: string;
  website: string;
  instagram_url: string | null;
  facebook_url: string | null;
  whatsapp_number: string | null;
};

const empty: Form = {
  phone_1: "",
  phone_2: "",
  email: "",
  website: "",
  instagram_url: "",
  facebook_url: "",
  whatsapp_number: "",
};

export default function ContactInfoSettingsPage() {
  const supabase = createClient();
  const [form, setForm] = useState<Form>(empty);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from("site_content")
      .select("phone_1, phone_2, email, website, instagram_url, facebook_url, whatsapp_number")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data) setForm({ ...empty, ...data });
        setLoading(false);
      });
  }, [supabase]);

  const handleSave = async () => {
    await supabase.from("site_content").update(form).eq("id", 1);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const field = (key: keyof Form, label: string) => (
    <div>
      <label className="mb-1 block text-xs font-medium text-ink/70">
        {label}
      </label>
      <input
        value={form[key] ?? ""}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm outline-none focus:border-maroon"
      />
    </div>
  );

  return (
    <>
      <AdminTopbar title="Contact Info" />
      <div className="p-6">
        <div className="max-w-2xl rounded-md bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-display text-base font-semibold text-ink">
            Contact details
          </h2>
          {loading ? (
            <p className="text-sm text-ink/40">Loading...</p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {field("phone_1", "Phone 1")}
                {field("phone_2", "Phone 2")}
              </div>
              {field("email", "Email")}
              {field("website", "Website")}
              {field("instagram_url", "Instagram URL")}
              {field("facebook_url", "Facebook URL")}
              {field("whatsapp_number", "WhatsApp number")}
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
