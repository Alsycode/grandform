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

      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-10">
          {Array.from({ length: 2 }).map((_, section) => (
            <div key={section} className="mb-16 last:mb-0">
              <Skeleton className="h-7 w-40" />
              <Skeleton className="mt-2 h-px w-16" />
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex gap-4 rounded-md bg-white p-4 shadow-sm"
                  >
                    <Skeleton className="h-20 w-20 shrink-0 rounded-sm" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
