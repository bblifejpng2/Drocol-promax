"use client";

import { useState, type FormEvent } from "react";
import { LEVELS, WHATSAPP, naira, type LevelId } from "./book/book-data";

const fieldClass =
  "w-full rounded-md border border-white/15 bg-primary px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-accent";

const interests = ["Assessment", "Advisory", "Training", "Technology", "Not sure yet"];

type Channel = "email" | "whatsapp";

// No backend yet, so the enquiry is handed to the visitor's own app:
// WhatsApp (works on any phone) or their email client. Replace with an API
// route that emails info@drocol.com when one exists.
export function ContactForm({ email, level }: { email: string; level?: LevelId }) {
  const [error, setError] = useState<string | null>(null);
  const booking = level ? LEVELS[level] : null;
  const defaultMessage = booking
    ? `I'd like to book the ${booking.name} penetration test (${naira(booking.price)} + VAT, ${booking.days} working days). Please confirm the earliest start date.`
    : "";

  function send(form: HTMLFormElement, channel: Channel) {
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !from || !message) {
      setError("Add your name, work email, and a short message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) {
      setError("Enter a valid work email.");
      return;
    }
    setError(null);
    const company = String(data.get("company") ?? "").trim();
    const interest = String(data.get("interest") ?? "");
    const subject = booking
      ? `Booking request — ${booking.name} — ${company || name}`
      : `Project enquiry — ${company || name}`;
    const body = `Name: ${name}\nCompany: ${company}\nEmail: ${from}\nInterested in: ${interest}\n\n${message}`;

    if (channel === "whatsapp") {
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`, "_blank", "noopener");
    } else {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    send(event.currentTarget, submitter?.value === "whatsapp" ? "whatsapp" : "email");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <label className="flex flex-col gap-2 text-sm text-white/60">
        Full name
        <input name="name" autoComplete="name" className={fieldClass} placeholder="Ada Okafor" />
      </label>
      <label className="flex flex-col gap-2 text-sm text-white/60">
        Company
        <input name="company" autoComplete="organization" className={fieldClass} placeholder="Company name" />
      </label>
      <label className="flex flex-col gap-2 text-sm text-white/60">
        Work email
        <input name="email" type="email" autoComplete="email" className={fieldClass} placeholder="name@company.com" />
      </label>
      <label className="flex flex-col gap-2 text-sm text-white/60">
        Interested in
        <select name="interest" className={fieldClass} defaultValue={interests[0]}>
          {interests.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm text-white/60 sm:col-span-2">
        How can we help?
        <textarea
          name="message"
          rows={5}
          className={fieldClass}
          defaultValue={defaultMessage}
          placeholder="Tell us what you're building and what you need to protect."
          onChange={() => error && setError(null)}
        />
      </label>
      {error && (
        <p role="alert" className="text-sm text-red-400 sm:col-span-2">
          {error}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <button
          type="submit"
          value="whatsapp"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-dark px-7 py-3 font-medium text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
          </svg>
          Send on WhatsApp
        </button>
        <button
          type="submit"
          value="email"
          className="rounded-full border border-white/20 px-7 py-3 font-medium text-white transition-colors hover:border-accent"
        >
          Send by email
        </button>
        <p className="w-full text-sm text-white/40">
          Opens WhatsApp or your email app with your message ready to send.
        </p>
      </div>
    </form>
  );
}
