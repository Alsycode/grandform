import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { getSiteContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy | Grand Form Hotel",
};

export default async function PrivacyPolicyPage() {
  const site = await getSiteContent();

  return (
    <LegalPage title="Privacy Policy" crumb="Privacy Policy" updated="21 August 2026">
      <p>
        This Privacy Policy explains how Grand Form Hotel (&quot;we&quot;,
        &quot;us&quot;, &quot;our&quot;) collects, uses and protects
        information you share with us through {site.website}, phone, email
        or in person when making a reservation or enquiry.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>Name, phone number and email address you provide via our contact or reservation form.</li>
        <li>Reservation details such as date, time and number of guests.</li>
        <li>Any message or special request you include when contacting us.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To confirm and manage your table reservation.</li>
        <li>To respond to enquiries sent via our contact form, phone or email.</li>
        <li>To improve our service and communicate offers, only where you have agreed to receive them.</li>
      </ul>

      <h2>Sharing Of Information</h2>
      <p>
        We do not sell or rent your personal information. We only share it
        with staff who need it to fulfil your reservation, or where required
        by law.
      </p>

      <h2>Data Retention</h2>
      <p>
        We retain reservation and enquiry details only as long as needed to
        provide our service and meet legal or accounting requirements.
      </p>

      <h2>Your Rights</h2>
      <p>
        You may ask us to access, correct or delete the personal information
        we hold about you by contacting us at {site.email} or{" "}
        {site.phone_1}.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about this policy can be sent to {site.email} or by
        writing to us at {site.address_line_1} {site.address_line_2}.
      </p>

      <p className="text-xs text-ink/40">
        This page is a general template and should be reviewed by a qualified
        professional to ensure it meets applicable local data protection laws
        before relying on it as a legal document.
      </p>
    </LegalPage>
  );
}
