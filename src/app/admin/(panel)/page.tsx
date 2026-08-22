import Link from "next/link";
import Image from "next/image";
import { UtensilsCrossed, Images, Plus } from "lucide-react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import StatCard from "@/components/admin/StatCard";
import Badge from "@/components/admin/Badge";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ count: menuCount }, { count: galleryCount }, { data: menuItems }] =
    await Promise.all([
      supabase.from("menu_items").select("id", { count: "exact", head: true }),
      supabase
        .from("gallery_images")
        .select("id", { count: "exact", head: true }),
      supabase
        .from("menu_items")
        .select("id, name, category, price, status, image_url")
        .order("sort_order")
        .limit(5),
    ]);

  return (
    <>
      <AdminTopbar title="Dashboard" />
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatCard
            label="Total Menu Items"
            value={menuCount ?? 0}
            icon={UtensilsCrossed}
            href="/admin/menu-items"
          />
          <StatCard
            label="Total Gallery Images"
            value={galleryCount ?? 0}
            icon={Images}
            href="/admin/gallery"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6">
          <div className="rounded-md bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold text-ink">
                Menu Items
              </h2>
              <Link
                href="/admin/menu-items"
                className="inline-flex items-center gap-1 rounded-sm bg-maroon-deep px-3 py-1.5 text-xs font-medium text-white hover:bg-maroon"
              >
                <Plus size={14} /> Add New Item
              </Link>
            </div>
            <div className="space-y-3">
              {(menuItems ?? []).map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm bg-ink/5">
                    {item.image_url && (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">
                      {item.name}
                    </p>
                    <p className="text-xs text-ink/50">{item.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-ink">
                    ₹{item.price}
                  </span>
                  <Badge status={item.status} />
                </div>
              ))}
              {(menuItems ?? []).length === 0 && (
                <p className="text-sm text-ink/40">No menu items yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
