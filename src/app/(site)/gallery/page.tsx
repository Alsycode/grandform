import type { Metadata } from "next";
import Image from "next/image";
import PageBanner from "@/components/PageBanner";
import { getGalleryImages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery | Grand Form Hotel",
  description:
    "A look inside Grand Form Hotel, Iringalakuda — ambience, dining spaces and the moments we serve every day.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <PageBanner title="Our Gallery" crumb="Gallery" />

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative aspect-square overflow-hidden rounded-md"
              >
                <Image
                  src={img.url}
                  alt={img.caption || "Grand Form Hotel gallery photo"}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
            {images.length === 0 && (
              <p className="col-span-full text-center text-sm text-ink/40">
                Gallery photos coming soon.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
