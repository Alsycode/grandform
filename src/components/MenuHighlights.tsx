import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Star } from "lucide-react";
import { getMenuItems } from "@/lib/data";

export default async function MenuHighlights() {
  const items = (await getMenuItems()).slice(0, 5);
  const [featured, ...rest] = items;

  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-cream py-16 lg:py-24"
    >
      <Image
        src="/images/about-bg.webp"
        alt=""
        fill
        aria-hidden
        sizes="100vw"
        className="pointer-events-none object-cover opacity-60"
      />

      <div className="relative mx-auto max-w-7xl px-5 text-center lg:px-10">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gold/60" />
          <p className="text-sm font-semibold tracking-[0.25em] text-maroon">
            MENU HIGHLIGHTS
          </p>
          <span className="h-px w-10 bg-gold/60" />
        </div>
        <h2 className="mt-3 font-display text-4xl font-bold text-maroon sm:text-5xl">
          Our Signature Favourites
        </h2>
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-gold/40" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px w-16 bg-gold/40" />
        </div>
        <p className="mt-4 text-ink/60">
          A selection of dishes our guests return for again and again.
        </p>

        {items.length === 0 && (
          <p className="mt-12 text-sm text-ink/40">Menu items coming soon.</p>
        )}

        {items.length > 0 && (
          <div className="mt-12 grid gap-5 text-left lg:grid-cols-[1.05fr_2fr]">
            {featured && (
              <div className="relative min-h-[420px] overflow-hidden rounded-md lg:min-h-[520px]">
                {featured.image_url && (
                  <Image
                    src={featured.image_url}
                    alt={featured.name}
                    fill
                    sizes="(min-width: 1024px) 35vw, 100vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep via-maroon-deep/30 to-transparent" />

                <div
                  className="absolute left-0 top-6 bg-maroon-deep px-4 pb-4 pt-3 text-center text-gold shadow-md"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)",
                  }}
                >
                  <p className="text-[11px] font-semibold leading-tight tracking-[0.1em]">
                    CHEF&apos;S
                    <br />
                    FAVOURITE
                  </p>
                  <Star size={12} className="mx-auto mt-1 fill-gold" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {featured.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="h-px w-14 bg-gold/50" />
                    <span className="h-1 w-1 rotate-45 bg-gold" />
                  </div>
                  <p className="mt-3 max-w-xs text-sm text-cream/80">
                    {featured.description}
                  </p>
                  <p className="mt-4 font-display text-xl font-bold text-gold">
                    ₹{featured.price}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {rest.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col overflow-hidden rounded-md bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] w-full">
                    {item.image_url && (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 90vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-bold text-maroon">
                      {item.name}
                    </h3>
                    <p className="mt-1 flex-1 text-sm text-ink/60">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-display text-lg font-bold text-gold">
                        ₹{item.price}
                      </span>
                      <Link
                        href="/menu"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-maroon hover:text-gold"
                      >
                        View <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex items-center justify-center gap-4">
          <span className="hidden h-px w-24 bg-gold/40 sm:block" />
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-sm bg-maroon-deep px-8 py-3.5 text-sm font-semibold tracking-wide text-white hover:bg-maroon"
          >
            Explore Full Menu <BookOpen size={16} />
          </Link>
          <span className="hidden h-px w-24 bg-gold/40 sm:block" />
        </div>
        <div className="mx-auto mt-6 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gold/30" />
          <span className="h-1 w-1 rotate-45 bg-gold" />
          <span className="h-px w-10 bg-gold/30" />
        </div>
      </div>
    </section>
  );
}
