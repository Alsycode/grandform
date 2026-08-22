import Image from "next/image";
import Link from "next/link";
import { Tag, ChefHat, Users, Sparkles } from "lucide-react";
import { getSpecials } from "@/lib/data";

const points = [
  { icon: Tag, label: "Best Offers Everyday" },
  { icon: ChefHat, label: "Fresh & Quality Ingredients" },
  { icon: Users, label: "Perfect For Every Occasion" },
  { icon: Sparkles, label: "Warm & Cozy Ambience" },
];

export default async function SpecialsBanner() {
  const specials = await getSpecials();

  return (
    <section
      id="specials"
      className="relative overflow-hidden bg-maroon-deep text-cream"
    >
      <Image
        src="/images/specials-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-maroon-deep/80" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-14 lg:flex-row lg:justify-between lg:px-10">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-gold">
            TODAY&apos;S SPECIAL
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Great Food. Great Offers.
          </h2>

          {specials.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {specials.map((s) => (
                <li key={s.id} className="rounded-sm border border-gold/20 bg-white/5 px-4 py-3">
                  <p className="font-display text-base font-semibold text-gold">
                    {s.title}
                  </p>
                  {s.description && (
                    <p className="mt-0.5 text-sm text-cream/70">{s.description}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 max-w-md text-cream/70">
              Enjoy our special dishes with exclusive offers every day.
            </p>
          )}

          <Link
            href="/menu"
            className="mt-6 inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 text-sm font-semibold tracking-wide text-ink hover:-translate-y-0.5"
          >
            View Our Menu <Tag size={16} />
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-10">
          {points.map((p) => (
            <div key={p.label} className="w-28 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold">
                <p.icon size={20} />
              </div>
              <p className="mt-2 text-xs font-medium text-cream/80">
                {p.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
