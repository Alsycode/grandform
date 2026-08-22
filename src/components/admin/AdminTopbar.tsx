"use client";

import Link from "next/link";
import { ExternalLink, Menu } from "lucide-react";
import { useAdminSidebar } from "./AdminSidebarContext";

export default function AdminTopbar({ title }: { title: string }) {
  const { toggle } = useAdminSidebar();

  return (
    <header className="flex items-center justify-between gap-3 border-b border-ink/10 bg-white px-4 py-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={toggle}
          className="shrink-0 rounded-sm border border-ink/15 p-2 text-ink hover:bg-cream lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu size={18} />
        </button>
        <h1 className="truncate font-display text-lg font-bold text-ink sm:text-xl">
          {title}
        </h1>
      </div>
      <Link
        href="/"
        target="_blank"
        className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-ink/15 px-3 py-2 text-xs font-medium text-ink hover:bg-cream sm:px-4"
      >
        <span className="hidden sm:inline">View Website</span>
        <ExternalLink size={14} />
      </Link>
    </header>
  );
}
