"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site-data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 bg-maroon-deep text-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-icon.webp"
            alt="Grand Form Restaurant logo"
            width={48}
            height={48}
            className="h-11 w-11 object-contain"
            priority
          />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-wide text-white">
              GRAND FORM
            </span>
            <span className="block text-[11px] tracking-[0.3em] text-gold">
              RESTAURANT
            </span>
          </span>
        </Link>

        <nav className="hidden items-center lg:flex">
          {navLinks.map((link, i) => (
            <span key={link.href} className="flex items-center">
              {i > 0 && <span className="mx-4 h-4 w-px bg-cream/20" />}
              <Link
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                  isActive(link.href)
                    ? "border-b-2 border-gold pb-0.5 text-gold"
                    : "text-cream/90"
                }`}
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="text-gold lg:hidden"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-white/10 bg-maroon-deep px-5 pb-4 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-cream/90 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
