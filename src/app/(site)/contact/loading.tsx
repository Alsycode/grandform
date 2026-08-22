import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="bg-maroon-deep py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-10">
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="h-4 w-40 bg-cream/15" />
          <Skeleton className="h-10 w-72 max-w-full bg-cream/15" />
          <Skeleton className="h-4 w-80 max-w-full bg-cream/15" />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="h-4 w-32 bg-cream/15" />
            <Skeleton className="h-8 w-48 bg-cream/15" />
            <Skeleton className="h-4 w-full bg-cream/15" />
            <Skeleton className="h-4 w-2/3 bg-cream/15" />
            <div className="mt-6 space-y-4">
              <Skeleton className="h-4 w-40 bg-cream/15" />
              <Skeleton className="h-4 w-40 bg-cream/15" />
              <Skeleton className="h-4 w-40 bg-cream/15" />
            </div>
          </div>
          <Skeleton className="min-h-[320px] rounded-md bg-cream/10 lg:min-h-[420px]" />
        </div>

        <div className="mt-14 flex justify-center gap-4">
          <Skeleton className="h-12 w-40 bg-cream/15" />
          <Skeleton className="h-12 w-40 bg-cream/15" />
        </div>
      </div>
    </section>
  );
}
