"use client";

import { useState, type FormEvent } from "react";

const fieldClass =
  "w-full rounded-md border border-white/15 bg-primary px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-accent";

const interests = ["Assessment", "Advisory", "Training", "Technology", "Not sure yet"];

// No backend yet: submitting opens the visitor's email app with the enquiry
// pre-filled. Swap handleSubmit for an API route when one exists.
export function ContactForm({ email }: { email: string }) {
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !from || !message) {
      setError("Add your name, work email, and a short message.");
      return;
    }
    setError(null);
    const company = String(data.get("company") ?? "").trim();
    const interest = String(data.get("interest") ?? "");
    const subject = `Project enquiry — ${company || name}`;
    const body = `Name: ${name}\nCompany: ${company}\nEmail: ${from}\nInterested in: ${interest}\n\n${message}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
          placeholder="Tell us what you're building and what you need to protect."
          onChange={() => error && setError(null)}
        />
      </label>
      {error && (
        <p role="alert" className="text-sm text-red-400 sm:col-span-2">
          {error}
        </p>
      )}
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="rounded-full bg-gradient-to-r from-accent to-accent-dark px-8 py-3 font-medium text-white"
        >
          Send enquiry
        </button>
      </div>
    </form>
  );
}
