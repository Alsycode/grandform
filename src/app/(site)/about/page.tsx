import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Armchair,
  BookOpen,
  ChefHat,
  CookingPot,
  Heart,
  UtensilsCrossed,
} from "lucide-react";
import PageBanner from "@/components/PageBanner";
import { getSiteContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us | Grand Form Hotel",
  description:
    "The story behind Grand Form Hotel in Iringalakuda — fresh ingredients, authentic flavours and warm hospitality for every guest.",
};

const values = [
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
    description: "Warm lighting, cozy spaces and a welcoming atmosphere.",
  },
];

const whyUs = [
  { icon: UtensilsCrossed, label: "Finest\nIngredients" },
  { icon: ChefHat, label: "Expert\nChefs" },
  { icon: Armchair, label: "Cozy\nAmbience" },
  { icon: Heart, label: "Memorable\nExperiences" },
];

export default async function AboutPage() {
  const site = await getSiteContent();

  return (
    <>
      <PageBanner title="About Us" crumb="About Us" />

      <section
        id="story"
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
              alt="Grand Form Hotel storefront"
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
              our story
            </span>

            <div className="relative flex items-center gap-3">
              <p className="text-sm font-semibold tracking-[0.25em] text-maroon">
                ABOUT GRAND FORM
              </p>
              <span className="h-px flex-1 max-w-10 bg-gold/60" />
            </div>

            <h1 className="relative mt-3 font-display text-4xl font-bold leading-tight text-maroon sm:text-5xl">
              A Place For Food Lovers
            </h1>

            <p className="relative mt-5 max-w-lg text-ink/70">
              {site.about_text}
            </p>
            <p className="relative mt-4 max-w-lg text-ink/70">
              What started as a simple idea — good food, served with warmth —
              has grown into a home for everyone who walks through our doors.
              From family lunches to celebrations with friends, every dish at
              Grand Form is prepared with care and every guest is welcomed
              like family.
            </p>

            <div className="relative mt-8 flex items-center gap-3">
              <span className="h-px flex-1 bg-gold/40" />
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
              <span className="h-px flex-1 bg-gold/40" />
            </div>

            <div className="relative mt-8 grid grid-cols-3">
              {values.map((f, i) => (
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
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-16 lg:py-24">
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-10">
          <div className="lg:order-2">
            <p className="text-sm font-semibold tracking-[0.25em] text-maroon">
              OUR HOSPITALITY
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              Why Guests Keep Coming Back
            </h2>
            <div className="mt-4 h-px w-16 bg-maroon" />
            <p className="mt-5 max-w-lg text-ink/70">
              We believe a great meal is more than what&apos;s on the plate.
              It&apos;s the warmth of the welcome, the comfort of the space,
              and the little details that make a visit memorable — that is
              the experience we set out to give every guest, every time.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-6">
              {whyUs.map((f, i) => (
                <div key={f.label} className="flex items-center">
                  {i > 0 && (
                    <span className="mr-8 hidden h-10 w-px bg-ink/10 sm:block" />
                  )}
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-maroon/40 text-maroon">
                      <f.icon size={18} />
                    </div>
                    <p className="whitespace-pre-line text-xs font-medium leading-tight text-ink/80">
                      {f.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-xl lg:order-1">
            <Image
              src="/images/contact-interior.webp"
              alt="Grand Form Hotel interior"
              width={900}
              height={700}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-maroon-deep py-16 text-cream lg:py-20">
        <Image
          src="/images/footer-bg.webp"
          alt=""
          fill
          aria-hidden
          sizes="100vw"
          className="pointer-events-none object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-maroon-deep/70" />

        <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-10">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/60" />
            <p className="text-sm font-semibold tracking-[0.25em] text-gold">
              VISIT GRAND FORM
            </p>
            <span className="h-px w-10 bg-gold/60" />
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Come Taste The Difference
          </h2>
          <p className="mt-4 text-cream/80">
            Good food, warm hospitality and great moments are waiting for
            you.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-sm bg-gold px-8 py-3 text-sm font-semibold text-ink hover:bg-gold-light"
            >
              View Our Menu <BookOpen size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm border border-gold/60 px-8 py-3 text-sm font-semibold text-gold hover:bg-gold/10"
            >
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
