"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ImagePlus, Plus, Trash2, Star, X } from "lucide-react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { createClient } from "@/lib/supabase/client";

type Testimonial = {
  id: string;
  name: string;
  message: string;
  rating: number;
  approved: boolean;
  avatar_url: string | null;
};

const emptyForm = {
  name: "",
  message: "",
  rating: 5,
  approved: true,
  avatar_url: "",
};

export default function TestimonialsPage() {
  const supabase = createClient();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch-on-mount, re-invoked after CRUD ops
    load();
  }, [load]);

  const openAdd = () => {
    setForm(emptyForm);
    setModalOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const path = `testimonials/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("site-images")
      .upload(path, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from("site-images").getPublicUrl(path);
      setForm((f) => ({ ...f, avatar_url: data.publicUrl }));
    }
    setUploading(false);
  };

  const handleSave = async () => {
    await supabase.from("testimonials").insert(form);
    setModalOpen(false);
    load();
  };

  const toggleApproved = async (t: Testimonial) => {
    await supabase
      .from("testimonials")
      .update({ approved: !t.approved })
      .eq("id", t.id);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    load();
  };

  return (
    <>
      <AdminTopbar title="Testimonials" />
      <div className="p-6">
        <div className="rounded-md bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-ink">
              Customer testimonials
            </h2>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 rounded-sm bg-maroon-deep px-4 py-2 text-sm font-medium text-white hover:bg-maroon"
            >
              <Plus size={16} /> Add Testimonial
            </button>
          </div>

          {loading && <p className="py-6 text-center text-ink/40">Loading...</p>}
          {!loading && items.length === 0 && (
            <p className="py-6 text-center text-ink/40">
              No testimonials submitted yet.
            </p>
          )}

          <div className="space-y-3">
            {items.map((t) => (
              <div
                key={t.id}
                className="flex items-start justify-between gap-4 rounded-md border border-ink/10 p-4"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-ink/5">
                  {t.avatar_url && (
                    <Image
                      src={t.avatar_url}
                      alt={t.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-ink">{t.name}</p>
                    <div className="flex text-gold">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-ink/60">{t.message}</p>
                </div>
                <button
                  onClick={() => toggleApproved(t)}
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    t.approved
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {t.approved ? "Approved" : "Pending"}
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="shrink-0 rounded-sm p-1.5 text-ink/60 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-md bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-ink">
                Add Testimonial
              </h3>
              <button onClick={() => setModalOpen(false)}>
                <X size={18} className="text-ink/50" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-ink/70">
                  Customer Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm outline-none focus:border-maroon"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-ink/70">
                  Message
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm outline-none focus:border-maroon"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-ink/70">
                  Photo
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-ink/5">
                    {form.avatar_url && (
                      <Image
                        src={form.avatar_url}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-maroon bg-white px-4 py-2 text-sm font-medium text-maroon hover:bg-maroon hover:text-white">
                    <ImagePlus size={16} />
                    {uploading ? "Uploading..." : "Choose Photo"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-ink/70">
                  Rating
                </label>
                <select
                  value={form.rating}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, rating: Number(e.target.value) }))
                  }
                  className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm outline-none focus:border-maroon"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} Star{r > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm text-ink/70">
                <input
                  type="checkbox"
                  checked={form.approved}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, approved: e.target.checked }))
                  }
                />
                Approved (visible on website)
              </label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-sm border border-ink/15 px-4 py-2 text-sm text-ink hover:bg-cream"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-sm bg-maroon-deep px-4 py-2 text-sm font-medium text-white hover:bg-maroon"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
