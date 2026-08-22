"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { createClient } from "@/lib/supabase/client";

type Special = {
  id: string;
  title: string;
  description: string;
  active: boolean;
};

const emptyForm = { title: "", description: "", active: true };

export default function SpecialsPage() {
  const supabase = createClient();
  const [specials, setSpecials] = useState<Special[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Special | null>(null);
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("specials")
      .select("*")
      .order("created_at", { ascending: false });
    setSpecials(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch-on-mount, re-invoked after CRUD ops
    load();
  }, [load]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (s: Special) => {
    setEditing(s);
    setForm({ title: s.title, description: s.description, active: s.active });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (editing) {
      await supabase.from("specials").update(form).eq("id", editing.id);
    } else {
      await supabase.from("specials").insert(form);
    }
    setModalOpen(false);
    load();
  };

  const toggleActive = async (s: Special) => {
    await supabase.from("specials").update({ active: !s.active }).eq("id", s.id);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this special?")) return;
    await supabase.from("specials").delete().eq("id", id);
    load();
  };

  return (
    <>
      <AdminTopbar title="Specials" />
      <div className="p-6">
        <div className="rounded-md bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-ink">
              Manage today&apos;s specials
            </h2>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 rounded-sm bg-maroon-deep px-4 py-2 text-sm font-medium text-white hover:bg-maroon"
            >
              <Plus size={16} /> Add Special
            </button>
          </div>

          {loading && <p className="py-6 text-center text-ink/40">Loading...</p>}
          {!loading && specials.length === 0 && (
            <p className="py-6 text-center text-ink/40">No specials yet.</p>
          )}

          <div className="space-y-3">
            {specials.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between gap-4 rounded-md border border-ink/10 p-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink">{s.title}</p>
                  <p className="truncate text-sm text-ink/60">{s.description}</p>
                </div>
                <button
                  onClick={() => toggleActive(s)}
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    s.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {s.active ? "Active" : "Inactive"}
                </button>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => openEdit(s)}
                    className="rounded-sm p-1.5 text-ink/60 hover:bg-cream hover:text-maroon"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="rounded-sm p-1.5 text-ink/60 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
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
                {editing ? "Edit Special" : "Add Special"}
              </h3>
              <button onClick={() => setModalOpen(false)}>
                <X size={18} className="text-ink/50" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-ink/70">
                  Title
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm outline-none focus:border-maroon"
                />
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
              <label className="flex items-center gap-2 text-sm text-ink/70">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, active: e.target.checked }))
                  }
                />
                Active
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
