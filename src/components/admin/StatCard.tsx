import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export default function StatCard({
  label,
  value,
  icon: Icon,
  href,
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
  href: string;
}) {
  return (
    <div className="rounded-md bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-ink/50">{label}</p>
          <p className="mt-1 font-display text-3xl font-bold text-ink">
            {value}
          </p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-maroon">
          <Icon size={20} />
        </div>
      </div>
      <Link
        href={href}
        className="mt-3 inline-block text-xs font-medium text-maroon hover:underline"
      >
        View all →
      </Link>
    </div>
  );
}
