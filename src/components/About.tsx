import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Armchair, ChefHat, CookingPot } from "lucide-react";
import { getSiteContent } from "@/lib/data";

const features = [
  {
    icon: CookingPot,
    label: "Delicious Food",
    description: "Made with the finest ingredients and crafted to perfection.",
  },
  {
    icon: ChefHat,
    label: "Hygienic Kitchen",
    description: "Prepared in a clean, safe and well-maintained kitchen.",
  },
  {
    icon: Armchair,
    label: "Great Ambience",
    description:
      "Warm lighting, cozy spaces and a welcoming atmosphere.",
  },
];

export default async function About() {
  const site = await getSiteContent();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-cream py-16 lg:py-24"
    >
      <Image
        src="/images/about-bg.webp"
        alt=""
        fill
        aria-hidden
        sizes="100vw"
        className="pointer-events-none object-cover opacity-70"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-10">
        <div className="overflow-hidden rounded-2xl shadow-xl">
          <Image
            src="/images/storefront.webp"
            alt="Grand Form Restaurant storefront"
            width={900}
            height={700}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-4 right-0 select-none font-display text-6xl italic text-maroon/5 sm:text-7xl"
          >
            about us
          </span>

          <div className="relative flex items-center gap-3">
            <p className="text-sm font-semibold tracking-[0.25em] text-maroon">
              ABOUT GRAND FORM
            </p>
            <span className="h-px flex-1 max-w-10 bg-gold/60" />
          </div>

          <h2 className="relative mt-3 font-display text-4xl font-bold leading-tight text-maroon sm:text-5xl">
            A Place For Food Lovers
          </h2>

          <p className="relative mt-5 max-w-lg text-ink/70">
            {site.about_text}
          </p>

          <div className="relative mt-8 flex items-center gap-3">
            <span className="h-px flex-1 bg-gold/40" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            <span className="h-px flex-1 bg-gold/40" />
          </div>

          <div className="relative mt-8 grid grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.label}
                className={`px-2 text-center sm:px-4 ${
                  i !== 0 ? "border-l border-maroon/15" : ""
                }`}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-maroon/40 text-maroon">
                  <f.icon size={26} />
                </div>
                <p className="mt-3 font-display text-base font-semibold text-maroon">
                  {f.label}
                </p>
                <p className="mt-1 text-xs text-ink/60">{f.description}</p>
              </div>
            ))}
          </div>

          <Link
            href="#about"
            className="relative mt-10 inline-flex items-center gap-2 border-b-2 border-gold pb-1 text-sm font-semibold text-maroon hover:text-gold"
          >
            Discover Our Story <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
