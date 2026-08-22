import Image from "next/image";
import Link from "next/link";
import { Images } from "lucide-react";
import { getGalleryImages } from "@/lib/data";

export default async function Gallery() {
  const images = (await getGalleryImages()).slice(0, 4);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <Image
        src="/images/about-bg.webp"
        alt=""
        fill
        aria-hidden
        sizes="100vw"
        className="pointer-events-none object-cover opacity-40"
      />

      <div className="relative mx-auto max-w-7xl px-5 text-center lg:px-10">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gold/60" />
          <p className="text-sm font-semibold tracking-[0.25em] text-maroon">
            OUR AMBIENCE
          </p>
          <span className="h-px w-10 bg-gold/60" />
        </div>
        <h2 className="mt-3 font-display text-4xl font-bold text-maroon sm:text-5xl">
          A Feast For Your Senses
        </h2>
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-gold/40" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px w-16 bg-gold/40" />
        </div>
        <p className="mt-4 text-ink/60">
          A glimpse into the warmth, light and charm of Grand Form.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-square overflow-hidden rounded-md shadow-sm"
            >
              <Image
                src={img.url}
                alt={img.caption || `Grand Form Hotel ambience`}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/70 via-maroon-deep/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {img.caption && (
                <p className="absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left text-xs font-medium text-cream opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {img.caption}
                </p>
              )}
            </div>
          ))}
          {images.length === 0 && (
            <p className="col-span-full text-sm text-ink/40">
              Gallery photos coming soon.
            </p>
          )}
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <span className="hidden h-px w-24 bg-gold/40 sm:block" />
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-sm bg-maroon-deep px-8 py-3.5 text-sm font-semibold tracking-wide text-white hover:bg-maroon"
          >
            View Gallery <Images size={16} />
          </Link>
          <span className="hidden h-px w-24 bg-gold/40 sm:block" />
        </div>
      </div>
    </section>
  );
}
