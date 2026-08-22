import Image from "next/image";
import { Phone, Mail, Globe, MapPin, Clock, Navigation } from "lucide-react";
import { getSiteContent } from "@/lib/data";

export default async function LocationContact() {
  const site = await getSiteContent();
  const mapsQuery = encodeURIComponent(site.map_query);

  return (
    <section id="location" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 text-center lg:px-10">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gold/60" />
          <p className="text-sm font-semibold tracking-[0.25em] text-maroon">
            VISIT &amp; REACH US
          </p>
          <span className="h-px w-10 bg-gold/60" />
        </div>
        <h2 className="mt-3 font-display text-4xl font-bold text-maroon sm:text-5xl">
          Come Say Hello
        </h2>
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-gold/40" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px w-16 bg-gold/40" />
        </div>
        <p className="mt-4 text-ink/60">
          Everything you need to plan your visit, in one place.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl gap-6 px-5 text-left lg:grid-cols-3 lg:px-10">
        <div className="rounded-md border border-ink/10 bg-cream p-6 shadow-sm">
          <p className="text-xs font-semibold tracking-[0.2em] text-maroon">
            VISIT US
          </p>
          <h3 className="mt-1 font-display text-xl font-bold text-ink">
            Find Us Here
          </h3>
          <div className="mt-4 aspect-[4/3] overflow-hidden rounded-sm bg-ink/10">
            <iframe
              title="Grand Form Hotel location"
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
          <a
            href={`https://www.google.com/maps?q=${mapsQuery}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-sm border border-maroon px-4 py-2 text-xs font-medium text-maroon hover:bg-maroon hover:text-white"
          >
            Get Directions <Navigation size={14} />
          </a>
        </div>

        <div className="rounded-md border border-ink/10 bg-cream p-6 shadow-sm">
          <p className="text-xs font-semibold tracking-[0.2em] text-maroon">
            CONTACT US
          </p>
          <h3 className="mt-1 font-display text-xl font-bold text-ink">
            We&apos;re Here To Serve You
          </h3>
          <div className="mt-4 space-y-3 text-sm text-ink/80">
            <p className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-maroon" />
              {[site.phone_1, site.phone_2].filter(Boolean).join(" / ")}
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-maroon" />
              {site.email}
            </p>
            <p className="flex items-center gap-2">
              <Globe size={16} className="shrink-0 text-maroon" />
              {site.website}
            </p>
            <p className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-maroon" />
              <span>
                {site.address_line_1} {site.address_line_2}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Clock size={16} className="shrink-0 text-maroon" />
              {site.hours}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-md shadow-sm">
          <Image
            src="/images/contact-interior.webp"
            alt="Grand Form Hotel interior"
            width={700}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
