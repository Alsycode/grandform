import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function AdminTopbar({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between border-b border-ink/10 bg-white px-6 py-4">
      <h1 className="font-display text-xl font-bold text-ink">{title}</h1>
      <Link
        href="/"
        target="_blank"
        className="inline-flex items-center gap-2 rounded-sm border border-ink/15 px-4 py-2 text-xs font-medium text-ink hover:bg-cream"
      >
        View Website <ExternalLink size={14} />
      </Link>
    </header>
  );
}
