"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { createClient } from "@/lib/supabase/client";

type GalleryImage = {
  id: string;
  url: string;
  category: string;
  caption: string;
};

const CATEGORIES = ["Ambience", "Food", "Beverage", "Events", "Others"];
const TABS = ["All Images", ...CATEGORIES];

export default function GalleryAdminPage() {
  const supabase = createClient();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [tab, setTab] = useState("All Images");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState("Ambience");

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order");
    setImages(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch-on-mount, re-invoked after CRUD ops
    load();
  }, [load]);

  const filtered =
    tab === "All Images" ? images : images.filter((i) => i.category === tab);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const path = `gallery/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("site-images")
      .upload(path, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from("site-images").getPublicUrl(path);
      await supabase.from("gallery_images").insert({
        url: data.publicUrl,
        category: uploadCategory,
        sort_order: images.length + 1,
      });
      load();
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    await supabase.from("gallery_images").delete().eq("id", id);
    load();
  };

  return (
    <>
      <AdminTopbar title="Gallery" />
      <div className="p-6">
        <div className="rounded-md bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-base font-semibold text-ink">
              Manage your restaurant gallery
            </h2>
            <div className="flex items-center gap-2">
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="rounded-sm border border-ink/15 px-2 py-2 text-xs outline-none focus:border-maroon"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-sm bg-maroon-deep px-4 py-2 text-sm font-medium text-white hover:bg-maroon">
                <Plus size={16} /> {uploading ? "Uploading..." : "Add New Image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file);
                  }}
                />
              </label>
            </div>
          </div>

          <div className="mb-4 flex gap-1 border-b border-ink/10">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-2 text-sm font-medium ${
                  tab === t
                    ? "border-b-2 border-maroon text-maroon"
                    : "text-ink/50 hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {loading && <p className="py-6 text-center text-ink/40">Loading...</p>}
          {!loading && filtered.length === 0 && (
            <p className="py-6 text-center text-ink/40">
              No images in this category yet.
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((img) => (
              <div key={img.id} className="group relative overflow-hidden rounded-md">
                <div className="relative aspect-square">
                  <Image
                    src={img.url}
                    alt={img.caption || img.category}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/60 px-2 py-1 text-xs text-white">
                  {img.category}
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="rounded-sm p-1 hover:text-red-300"
                    aria-label="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
