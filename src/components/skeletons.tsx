import { Skeleton } from "@/components/ui/skeleton";

function Eyebrow() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-9 w-72 max-w-full" />
      <Skeleton className="h-4 w-56 max-w-full" />
    </div>
  );
}

export function MenuHighlightsSkeleton() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 text-center lg:px-10">
        <Eyebrow />
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_2fr]">
          <Skeleton className="min-h-[420px] rounded-md lg:min-h-[520px]" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-md bg-white shadow-sm">
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <div className="space-y-2 p-5">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function GallerySkeleton() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 text-center lg:px-10">
        <Eyebrow />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-md" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSkeleton() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 text-center lg:px-10">
        <Eyebrow />
        <div className="mx-auto mt-8 h-64 w-80 rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex flex-col items-center gap-4 pt-6">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function LocationContactSkeleton() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 text-center lg:px-10">
        <Eyebrow />
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 text-left lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-md" />
          ))}
        </div>
      </div>
    </section>
  );
}
