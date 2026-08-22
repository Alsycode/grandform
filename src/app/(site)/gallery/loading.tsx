import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <section className="bg-maroon-deep py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Skeleton className="h-9 w-48 bg-cream/15" />
          <Skeleton className="mt-3 h-4 w-32 bg-cream/15" />
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-md" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
