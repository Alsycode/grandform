"use client";

import { useEffect, useState, useCallback } from "react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import Badge from "@/components/admin/Badge";
import { createClient } from "@/lib/supabase/client";

type Reservation = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  reservation_date: string;
  reservation_time: string;
  people: number;
  status: string;
  notes: string | null;
};

const STATUSES = ["Pending", "Confirmed", "Cancelled"];

export default function ReservationsPage() {
  const supabase = createClient();
  const [items, setItems] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch-on-mount, re-invoked after CRUD ops
    load();
  }, [load]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("reservations").update({ status }).eq("id", id);
    load();
  };

  return (
    <>
      <AdminTopbar title="Reservations" />
      <div className="p-6">
        <div className="rounded-md bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-display text-base font-semibold text-ink">
            All reservations
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-ink/40">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Phone</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Time</th>
                  <th className="pb-3 font-medium">People</th>
                  <th className="pb-3 font-medium">Status</th>
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
                {!loading && items.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-ink/40">
                      No reservations yet.
                    </td>
                  </tr>
                )}
                {items.map((r) => (
                  <tr key={r.id} className="border-t border-ink/5">
                    <td className="py-3 font-medium text-ink">{r.name}</td>
                    <td className="py-3 text-ink/70">{r.phone}</td>
                    <td className="py-3 text-ink/70">{r.reservation_date}</td>
                    <td className="py-3 text-ink/70">{r.reservation_time}</td>
                    <td className="py-3 text-ink/70">{r.people}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Badge status={r.status} />
                        <select
                          value={r.status}
                          onChange={(e) => updateStatus(r.id, e.target.value)}
                          className="rounded-sm border border-ink/15 px-1.5 py-1 text-xs outline-none"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
