import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Navigation, Map } from "lucide-react";
import { getSiteContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us | Grand Form Hotel",
  description:
    "Get in touch with Grand Form Hotel in Iringalakuda — call, email, or find directions to book your table.",
};

export default async function ContactPage() {
  const site = await getSiteContent();
  const mapsQuery = encodeURIComponent(site.map_query);
  const mapsUrl = `https://www.google.com/maps?q=${mapsQuery}`;
  const telHref = `tel:${site.phone_1.replace(/\s+/g, "")}`;

  return (
    <section className="relative overflow-hidden bg-maroon-deep py-16 text-cream lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/storefront.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-left opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-deep via-maroon-deep/95 to-maroon-deep/70 lg:from-maroon-deep lg:via-maroon-deep/90 lg:to-maroon-deep/40" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 lg:px-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.3em] text-gold">
            <span className="h-px w-10 bg-gold/60" />
            VISIT GRAND FORM
            <span className="h-px w-10 bg-gold/60" />
          </div>
          <h1 className="mt-3 font-display text-4xl font-bold text-cream sm:text-5xl">
            Come Dine With Us
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold/50" />
          <p className="mt-4 text-cream/80">
            Good food, warm hospitality and great moments are waiting for you.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-gold">
              FIND US HERE
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-cream sm:text-3xl">
              Grand Form Hotel
            </h2>

            <div className="mt-6 space-y-4 text-sm text-cream/85">
              <p className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  {site.address_line_1} {site.address_line_2}
                </span>
              </p>
            </div>

            <div className="mt-6 h-px w-full max-w-sm bg-gold/25" />

            <div className="mt-6 space-y-5 text-sm">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-gold">
                  <Phone size={14} /> PHONE
                </p>
                <p className="mt-1 text-cream/85">
                  {[site.phone_1, site.phone_2].filter(Boolean).join(" / ")}
                </p>
              </div>

              <div>
                <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-gold">
                  <Mail size={14} /> EMAIL
                </p>
                <p className="mt-1 text-cream/85">{site.email}</p>
              </div>

              <div>
                <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-gold">
                  <Clock size={14} /> OPENING HOURS
                </p>
                <p className="mt-1 text-cream/85">
                  {site.hours.replace(/^Open\s*/i, "")}
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-gold/40 bg-ink/40">
            <div className="relative aspect-[4/3] w-full">
              <iframe
                title="Grand Form Hotel location"
                src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                className="h-full w-full border-0 opacity-90 grayscale invert"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-maroon-deep/20" />
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="pointer-events-auto absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-sm border border-gold/60 bg-ink/80 px-4 py-2 text-xs font-medium text-cream backdrop-blur hover:bg-ink"
              >
                <Map size={14} /> Open in Maps
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-gold px-8 py-3 text-sm font-semibold text-ink hover:bg-gold-light"
          >
            <Navigation size={16} /> Get Directions
          </a>
          <span className="hidden h-8 w-px bg-gold/30 sm:block" />
          <Link
            href={telHref}
            className="inline-flex items-center gap-2 rounded-sm border border-gold/60 px-8 py-3 text-sm font-semibold text-gold hover:bg-gold/10"
          >
            <Phone size={16} /> Call Us
          </Link>
        </div>

        <div className="mx-auto mt-10 h-px w-24 bg-gold/40" />
      </div>
    </section>
  );
}
