"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ImagePlus, Plus, Pencil, Trash2, X } from "lucide-react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import Badge from "@/components/admin/Badge";
import { createClient } from "@/lib/supabase/client";

type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  status: string;
  sort_order: number;
};

const CATEGORIES = ["Starters", "Main Course", "Beverages", "Desserts"];
const TABS = ["All Items", ...CATEGORIES];

const emptyForm = {
  category: "Main Course",
  name: "",
  description: "",
  price: "",
  image_url: "",
  status: "Active",
};

export default function MenuItemsPage() {
  const supabase = createClient();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("All Items");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("menu_items")
      .select("*")
      .order("sort_order");
    setItems(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch-on-mount, re-invoked after CRUD ops
    load();
  }, [load]);

  const filtered =
    tab === "All Items" ? items : items.filter((i) => i.category === tab);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditing(item);
    setForm({
      category: item.category,
      name: item.name,
      description: item.description,
      price: String(item.price),
      image_url: item.image_url ?? "",
      status: item.status,
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const path = `menu-items/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("site-images")
      .upload(path, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from("site-images").getPublicUrl(path);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
    }
    setUploading(false);
  };

  const handleSave = async () => {
    const payload = {
      category: form.category,
      name: form.name,
      description: form.description,
      price: Number(form.price) || 0,
      image_url: form.image_url || null,
      status: form.status,
    };

    if (editing) {
      await supabase.from("menu_items").update(payload).eq("id", editing.id);
    } else {
      await supabase
        .from("menu_items")
        .insert({ ...payload, sort_order: items.length + 1 });
    }

    setModalOpen(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this menu item?")) return;
    await supabase.from("menu_items").delete().eq("id", id);
    load();
  };

  return (
    <>
      <AdminTopbar title="Menu Items" />
      <div className="p-6">
        <div className="rounded-md bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-base font-semibold text-ink">
                Manage your restaurant menu items
              </h2>
            </div>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 rounded-sm bg-maroon-deep px-4 py-2 text-sm font-medium text-white hover:bg-maroon"
            >
              <Plus size={16} /> Add New Item
            </button>
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

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-ink/40">
                  <th className="pb-3 font-medium">Image</th>
                  <th className="pb-3 font-medium">Item Name</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-ink/40">
                      Loading...
                    </td>
                  </tr>
                )}
                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-ink/40">
                      No items in this category yet.
                    </td>
                  </tr>
                )}
                {filtered.map((item) => (
                  <tr key={item.id} className="border-t border-ink/5">
                    <td className="py-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-sm bg-ink/5">
                        {item.image_url && (
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        )}
                      </div>
                    </td>
                    <td className="py-3 font-medium text-ink">{item.name}</td>
                    <td className="py-3 text-ink/70">{item.category}</td>
                    <td className="py-3 text-ink/70">₹{item.price}</td>
                    <td className="py-3">
                      <Badge status={item.status} />
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="rounded-sm p-1.5 text-ink/60 hover:bg-cream hover:text-maroon"
                          aria-label="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="rounded-sm p-1.5 text-ink/60 hover:bg-red-50 hover:text-red-600"
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-md bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-ink">
                {editing ? "Edit Menu Item" : "Add Menu Item"}
              </h3>
              <button onClick={() => setModalOpen(false)} aria-label="Close">
                <X size={18} className="text-ink/50" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-ink/70">
                  Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm outline-none focus:border-maroon"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-ink/70">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value }))
                    }
                    className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm outline-none focus:border-maroon"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-ink/70">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: e.target.value }))
                    }
                    className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm outline-none focus:border-maroon"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-ink/70">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm outline-none focus:border-maroon"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-ink/70">
                  Image
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-ink/5">
                    {form.image_url && (
                      <Image
                        src={form.image_url}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-maroon bg-white px-4 py-2 text-sm font-medium text-maroon hover:bg-maroon hover:text-white">
                    <ImagePlus size={16} />
                    {uploading ? "Uploading..." : "Choose Image"}
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
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, status: e.target.value }))
                  }
                  className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm outline-none focus:border-maroon"
                >
                  <option value="Active">Active</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>
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
