import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { getSiteContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms & Conditions | Grand Form Restaurant",
};

export default async function TermsPage() {
  const site = await getSiteContent();

  return (
    <LegalPage
      title="Terms & Conditions"
      crumb="Terms & Conditions"
      updated="21 August 2026"
    >
      <p>
        These Terms & Conditions govern your use of {site.website} and your
        interactions with Grand Form Restaurant, located at {site.address_line_1}{" "}
        {site.address_line_2}. By using our website or making a reservation
        with us, you agree to these terms.
      </p>

      <h2>Reservations</h2>
      <ul>
        <li>Reservations made via phone, email or our website are subject to table availability.</li>
        <li>We may ask for a phone number to confirm your booking.</li>
        <li>Large group bookings may require advance notice or a deposit — please call us to confirm.</li>
      </ul>

      <h2>Website Use</h2>
      <ul>
        <li>Content on this website — including text, photos and the Grand Form logo — belongs to Grand Form Restaurant and may not be reproduced without permission.</li>
        <li>Menu items, prices and photos are for reference and may change without prior notice.</li>
      </ul>

      <h2>Conduct On Premises</h2>
      <p>
        We reserve the right to refuse service to anyone behaving in a manner
        that is unsafe, disruptive or disrespectful to our staff and other
        guests.
      </p>

      <h2>Limitation Of Liability</h2>
      <p>
        While we take care to keep information on this website accurate, we
        are not liable for any indirect loss arising from reliance on it.
        For allergy or dietary concerns, please inform our staff directly
        before ordering.
      </p>

      <h2>Changes To These Terms</h2>
      <p>
        We may update these terms from time to time. Continued use of our
        website or services after changes are posted means you accept the
        revised terms.
      </p>

      <h2>Contact Us</h2>
      <p>
        For any questions about these terms, reach us at {site.email} or{" "}
        {site.phone_1}.
      </p>

      <p className="text-xs text-ink/40">
        This page is a general template and should be reviewed by a qualified
        professional to ensure it meets applicable local laws before relying
        on it as a legal document.
      </p>
    </LegalPage>
  );
}
