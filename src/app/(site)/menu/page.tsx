import type { Metadata } from "next";
import Image from "next/image";
import PageBanner from "@/components/PageBanner";
import { getMenuItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Menu | Grand Form Restaurant",
  description:
    "Explore the full menu at Grand Form Restaurant, Iringalakuda — starters, main course, beverages and desserts made with fresh ingredients.",
};

const CATEGORIES = ["Starters", "Main Course", "Beverages", "Desserts"];

export default async function MenuPage() {
  const items = await getMenuItems();

  return (
    <>
      <PageBanner title="Our Menu" crumb="Menu" />

      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-10">
          {CATEGORIES.map((category) => {
            const categoryItems = items.filter((item) => item.category === category);

            return (
              <div key={category} className="mb-16 last:mb-0">
                <h2 className="font-display text-2xl font-bold text-ink">
                  {category}
                </h2>
                <div className="mt-1 h-px w-16 bg-maroon" />

                {categoryItems.length > 0 ? (
                  <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 rounded-md bg-white p-4 shadow-sm"
                      >
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm">
                          {item.image_url && (
                            <Image
                              src={item.image_url}
                              alt={item.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-display text-base font-semibold text-ink">
                              {item.name}
                            </h3>
                            <span className="shrink-0 font-semibold text-ink">
                              ₹{item.price}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-ink/60">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-6 text-sm text-ink/50">
                    New {category.toLowerCase()} items are being added soon —
                    check back or call us for today&apos;s specials.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
