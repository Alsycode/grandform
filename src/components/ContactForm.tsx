"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

export default function ContactForm({
  restaurantEmail,
  restaurantPhone,
}: {
  restaurantEmail: string;
  restaurantPhone: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${restaurantEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-ink/70">
            Name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-sm border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-maroon"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-ink/70">
            Phone
          </label>
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-sm border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-maroon"
            placeholder="Your phone number"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-ink/70">
          Email
        </label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-sm border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-maroon"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-ink/70">
          Message
        </label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-sm border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-maroon"
          placeholder="Tell us about your reservation or query..."
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-sm bg-maroon-deep px-6 py-3 text-sm font-semibold tracking-wide text-white hover:bg-maroon"
      >
        Send Message <Send size={16} />
      </button>
      <p className="text-xs text-ink/50">
        This opens your email app addressed to {restaurantEmail} with your
        message pre-filled. Prefer to talk? Call {restaurantPhone}.
      </p>
    </form>
  );
}
