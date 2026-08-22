import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="bg-maroon-deep py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="max-w-2xl space-y-4">
          <Skeleton className="h-4 w-40 bg-cream/15" />
          <Skeleton className="h-12 w-full bg-cream/15" />
          <Skeleton className="h-12 w-2/3 bg-cream/15" />
          <Skeleton className="h-4 w-full bg-cream/15" />
        </div>
        <Skeleton className="mt-12 h-24 w-full rounded-xl bg-cream/10" />
      </div>
    </section>
  );
}
