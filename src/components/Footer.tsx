import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/lib/site-data";
import { getSiteContent } from "@/lib/data";

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.25-1.5 1.5-1.5H16.5V4.3c-.27-.04-1.2-.12-2.28-.12-2.25 0-3.79 1.37-3.79 3.9V10.5H8v3h2.43V21h3.07Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.7" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="20" cy="20" r="16" stroke="var(--color-gold)" />
      <polyline points="20,10 20,20 26,20" stroke="var(--color-gold)" strokeLinecap="round" />
    </svg>
  );
}


function HeadsetIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--color-gold)" strokeWidth="1.5">
      <path d="M10 22v-4a10 10 0 0 1 20 0v4" />
      <rect x="6" y="22" width="6" height="8" rx="2" />
      <rect x="28" y="22" width="6" height="8" rx="2" />
      <path d="M34 30v2a4 4 0 0 1-4 4h-6" />
      <circle cx="22" cy="36" r="2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12" y2="18" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="22,4 12,13 2,4" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="120"
      height="16"
      viewBox="0 0 120 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="0" y1="8" x2="45" y2="8" stroke="var(--color-gold)" strokeWidth="0.8" />
      <line x1="75" y1="8" x2="120" y2="8" stroke="var(--color-gold)" strokeWidth="0.8" />
      <path
        d="M52 8 C55 4, 58 4, 60 8 C62 12, 65 12, 68 8"
        stroke="var(--color-gold)"
        strokeWidth="0.8"
        fill="none"
      />
      <circle cx="48" cy="8" r="1.5" fill="var(--color-gold)" />
      <circle cx="72" cy="8" r="1.5" fill="var(--color-gold)" />
    </svg>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-2">
      <span className="h-px w-8 bg-gold/60" />
      <span className="text-gold text-xs">&#9670;</span>
      <span className="h-px w-8 bg-gold/60" />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold tracking-[0.2em] text-gold uppercase">
        {children}
      </h4>
      <div className="mt-2 flex items-center gap-1.5">
        <span className="h-px w-10 bg-gold/50" />
        <span className="text-gold/70 text-[8px]">&#9670;</span>
        <span className="h-px w-10 bg-gold/50" />
      </div>
    </div>
  );
}

export default async function Footer() {
  const site = await getSiteContent();

  return (
    <footer className="relative text-cream/80 overflow-hidden">
      <Image
        src="/images/footer-bg.webp"
        alt=""
        fill
        aria-hidden
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-maroon-deep/60" />

      <div className="relative z-10">
        {/* Top branding section */}
        <div className="flex flex-col items-center pt-14 pb-10 px-5">
          <Image
            src="/images/logo-icon.webp"
            alt="Grand Form Hotel logo"
            width={72}
            height={72}
            className="h-18 w-18 object-contain"
          />
          <h2 className="mt-3 font-display text-2xl font-bold tracking-[0.15em] text-white sm:text-3xl">
            GRAND FORM
          </h2>
          <span className="mt-1 text-[11px] tracking-[0.35em] text-gold font-medium">
            &#8226; HOTEL &#8226;
          </span>
          <OrnamentDivider className="mt-5" />
          <p className="mt-4 font-display text-lg tracking-[0.15em] text-gold-light sm:text-xl">
            GOOD FOOD. GREAT MOMENTS.
          </p>
          <OrnamentDivider className="mt-4" />
        </div>

        {/* Main footer columns */}
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">
          {/* Column 1: Grand Form */}
          <div>
            <SectionHeading>Grand Form</SectionHeading>
            <p className="mt-5 text-sm leading-relaxed text-cream/70">
              Good food, great service and unforgettable moments.
              Thank you for choosing Grand Form.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={site.facebook_url || "#"}
                target={site.facebook_url ? "_blank" : undefined}
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 text-gold transition-colors hover:bg-gold hover:text-maroon-deep"
              >
                <FacebookIcon />
              </a>
              {site.instagram_url && (
                <a
                  href={site.instagram_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 text-gold transition-colors hover:bg-gold hover:text-maroon-deep"
                >
                  <InstagramIcon />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <SectionHeading>Quick Links</SectionHeading>
            <ul className="mt-5 space-y-2.5 text-sm">
              {footerLinks.quick.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-cream/70 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Information */}
          <div>
            <SectionHeading>Information</SectionHeading>
            <div className="mt-5 space-y-5">
              <div className="flex items-start gap-3">
                <div className="shrink-0">
                  <ClockIcon />
                </div>
                <div>
                  <h5 className="text-xs font-semibold tracking-[0.15em] text-gold uppercase">
                    Opening Hours
                  </h5>
                  <p className="mt-0.5 text-sm text-cream/70">
                    12:00 PM &mdash; 12:00 AM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="shrink-0">
                  <HeadsetIcon />
                </div>
                <div>
                  <h5 className="text-xs font-semibold tracking-[0.15em] text-gold uppercase">
                    Contact Us
                  </h5>
                  <p className="mt-0.5 text-sm text-cream/70">
                    We&apos;re here to serve you<br />with the best.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div>
            <SectionHeading>Contact</SectionHeading>
            <ul className="mt-5 space-y-3.5 text-sm">
              {site.phone_1 && (
                <li className="flex items-center gap-3 text-cream/70">
                  <span className="text-gold"><PhoneIcon /></span>
                  {site.phone_1}
                </li>
              )}
              {site.phone_2 && (
                <li className="flex items-center gap-3 text-cream/70">
                  <span className="text-gold"><MobileIcon /></span>
                  {site.phone_2}
                </li>
              )}
              {site.email && (
                <li className="flex items-center gap-3 text-cream/70">
                  <span className="text-gold"><MailIcon /></span>
                  {site.email}
                </li>
              )}
              <li className="flex items-start gap-3 text-cream/70">
                <span className="mt-0.5 text-gold"><LocationIcon /></span>
                <span>
                  {site.address_line_1 && <>{site.address_line_1}<br /></>}
                  {site.address_line_2}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold/20">
          <div className="flex justify-center py-3">
            <OrnamentDivider />
          </div>
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 pb-6 sm:flex-row lg:px-12">
            <p className="text-xs text-cream/50">
              &copy; 2026 Grand Form Hotel. All rights reserved.
            </p>
            <div className="flex items-center gap-0 text-xs text-cream/50">
              {footerLinks.bottom.map((l, i) => (
                <span key={l.label} className="flex items-center">
                  {i > 0 && (
                    <span className="mx-3 h-3.5 w-px bg-gold/40" />
                  )}
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
