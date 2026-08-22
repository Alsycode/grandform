import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { AdminSidebarProvider } from "@/components/admin/AdminSidebarContext";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <AdminSidebarProvider>
      <div className="flex min-h-screen bg-cream">
        <AdminSidebar email={user.email ?? ""} />
        <main className="min-w-0 flex-1 overflow-x-hidden">{children}</main>
      </div>
    </AdminSidebarProvider>
  );
}
