"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Images,
  Star,
  MessageSquareQuote,
  CalendarCheck,
  Info,
  MapPin,
  Phone,
  Settings,
  Users,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const manageLinks = [
  { href: "/admin/menu-items", label: "Menu Items", icon: UtensilsCrossed },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/testimonials", label: "Testimonial", icon: MessageSquareQuote },
  // { href: "/admin/specials", label: "Specials", icon: Star },
  // { href: "/admin/reservations", label: "Reservations", icon: CalendarCheck },
];

const contentLinks: typeof manageLinks = [
  // { href: "/admin/about", label: "About Us", icon: Info },
  // { href: "/admin/location", label: "Location", icon: MapPin },
  // { href: "/admin/contact-info", label: "Contact Info", icon: Phone },
];

const settingsLinks = [
  { href: "/admin/settings", label: "General Settings", icon: Settings },
  { href: "/admin/users", label: "Users", icon: Users },
];

function NavGroup({
  title,
  links,
  pathname,
}: {
  title: string;
  links: typeof manageLinks;
  pathname: string;
}) {
  return (
    <div className="mb-6">
      <p className="mb-2 px-3 text-[11px] font-semibold tracking-[0.2em] text-cream/40">
        {title}
      </p>
      <div className="space-y-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-gold text-ink font-semibold"
                  : "text-cream/80 hover:bg-white/5 hover:text-white"
              }`}
            >
              <link.icon size={16} />
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col bg-maroon-deep text-cream">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <Image
          src="/images/logo-icon.webp"
          alt="Grand Form Restaurant"
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
        <span className="leading-tight">
          <span className="block font-display text-sm font-semibold text-white">
            GRAND FORM
          </span>
          <span className="block text-[10px] tracking-[0.3em] text-gold">
            RESTAURANT
          </span>
        </span>
      </div>

      <div className="border-b border-white/10 px-5 py-3">
        <p className="text-xs text-cream/50">Signed in as</p>
        <p className="truncate text-sm font-medium text-white">{email}</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <Link
          href="/admin"
          className={`mb-6 flex items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors ${
            pathname === "/admin"
              ? "bg-gold text-ink font-semibold"
              : "text-cream/80 hover:bg-white/5 hover:text-white"
          }`}
        >
          <LayoutDashboard size={16} />
          Dashboard
        </Link>

        <NavGroup title="MANAGE" links={manageLinks} pathname={pathname} />
        {contentLinks.length > 0 && (
          <NavGroup title="CONTENT" links={contentLinks} pathname={pathname} />
        )}
        <NavGroup title="SETTINGS" links={settingsLinks} pathname={pathname} />
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-sm text-cream/80 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
