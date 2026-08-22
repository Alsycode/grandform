import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  UtensilsCrossed,
  ChefHat,
  Armchair,
  Heart,
  ArrowRight,
  Scissors,
} from "lucide-react";
import { getSiteContent } from "@/lib/data";

const features = [
  { icon: UtensilsCrossed, label: "Finest\nIngredients" },
  { icon: ChefHat, label: "Expert\nChefs" },
  { icon: Armchair, label: "Cozy\nAmbience" },
  { icon: Heart, label: "Memorable\nExperiences" },
];

export default async function Hero() {
  const site = await getSiteContent();

  return (
    <section id="home" className="relative overflow-hidden bg-maroon-deep text-cream">
      <Image
        src="/images/hero-bg.webp"
        alt="Grand Form Hotel dining area"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-maroon-deep/85 via-maroon-deep/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 pt-14 pb-8 lg:px-10 lg:pt-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 text-gold">
            <span className="h-px w-16 bg-gold/60" />
            <ArrowRight size={14} className="-mr-1" />
            <UtensilsCrossed size={18} />
          </div>

          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            GOOD FOOD.
            <br />
            <span className="text-gold">GREAT MOMENTS.</span>
          </h1>

          <div className="mt-4 flex items-center gap-2 text-gold">
            <Scissors size={14} />
            <span className="h-px w-14 bg-gold/40" />
          </div>

          <p className="mt-4 max-w-md text-cream/85">
            Delicious food, warm ambiance and memorable experiences.
            <br />
            Every visit, made special.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
            {features.map((f, i) => (
              <div key={f.label} className="flex items-center">
                {i > 0 && (
                  <span className="mr-6 hidden h-10 w-px bg-cream/20 sm:block" />
                )}
                <div className="flex items-center gap-2.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
                    <f.icon size={18} />
                  </div>
                  <p className="whitespace-pre-line text-xs font-medium leading-tight text-cream/90">
                    {f.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/menu"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-gold py-1.5 pl-6 pr-1.5 text-sm font-semibold tracking-wide text-ink transition-transform hover:-translate-y-0.5"
          >
            Explore Our Menu
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-gold transition-transform group-hover:translate-x-0.5">
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>

        <div className="mt-12 rounded-xl border border-white/10 bg-black/40 px-6 py-5 backdrop-blur-sm sm:mt-16">
          <div className="grid grid-cols-1 gap-5 divide-y divide-white/10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-y-0">
            <div className="flex items-center gap-3 sm:pr-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gold">Open Daily</p>
                <p className="text-xs text-cream/80">{site.hours.replace(/^Open\s*/i, "")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-5 sm:px-6 sm:pt-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gold">Location</p>
                <p className="text-xs text-cream/80">
                  {site.address_line_1.replace(/,\s*$/, "")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-5 sm:pl-6 sm:pt-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gold">Call Us</p>
                <p className="text-xs text-cream/80">{site.phone_1}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
