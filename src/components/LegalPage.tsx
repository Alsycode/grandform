import type { ReactNode } from "react";
import PageBanner from "@/components/PageBanner";

export default function LegalPage({
  title,
  crumb,
  updated,
  children,
}: {
  title: string;
  crumb: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageBanner title={title} crumb={crumb} />
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-10">
          <p className="text-sm text-ink/50">Last updated: {updated}</p>
          <div className="prose-legal mt-6 space-y-6 text-sm leading-relaxed text-ink/80 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
