import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { getSiteContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "Refund Policy | Grand Form Hotel",
};

export default async function RefundPolicyPage() {
  const site = await getSiteContent();

  return (
    <LegalPage
      title="Refund Policy"
      crumb="Refund Policy"
      updated="21 August 2026"
    >
      <p>
        This policy explains how Grand Form Hotel handles cancellations and
        refunds for table reservations and any advance payments made
        through our website or over the phone.
      </p>

      <h2>Reservation Cancellations</h2>
      <ul>
        <li>Reservations can be cancelled or rescheduled free of charge by calling us at {site.phone_1} or {site.phone_2}.</li>
        <li>We appreciate at least a few hours&apos; notice so we can offer the table to other guests.</li>
      </ul>

      <h2>Advance Payments &amp; Deposits</h2>
      <ul>
        <li>For large group bookings or special events that require an advance deposit, the deposit is refundable if cancelled at least 24 hours before the reservation time.</li>
        <li>Deposits for cancellations made with less notice, or no-shows, are non-refundable.</li>
      </ul>

      <h2>Order Issues</h2>
      <p>
        If there is an issue with your order — wrong item, quality concern,
        or anything else — please let our staff know immediately so we can
        make it right, whether that means a replacement or a refund at our
        discretion.
      </p>

      <h2>How Refunds Are Processed</h2>
      <p>
        Approved refunds are returned to the original payment method within
        5–7 business days. For cash payments, refunds are issued in cash at
        the hotel.
      </p>

      <h2>Contact Us</h2>
      <p>
        For refund or cancellation requests, contact us at {site.email} or{" "}
        {site.phone_1}.
      </p>

      <p className="text-xs text-ink/40">
        This page is a general template and should be reviewed by a
        qualified professional to ensure it meets applicable local laws
        before relying on it as a legal document.
      </p>
    </LegalPage>
  );
}
