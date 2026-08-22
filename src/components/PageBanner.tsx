import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PageBanner({
  title,
  crumb,
}: {
  title: string;
  crumb: string;
}) {
  return (
    <section className="bg-maroon-deep py-14 text-cream lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          {title}
        </h1>
        <div className="mt-3 flex items-center gap-2 text-sm text-cream/70">
          <Link href="/" className="hover:text-gold">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-gold">{crumb}</span>
        </div>
      </div>
    </section>
  );
}
