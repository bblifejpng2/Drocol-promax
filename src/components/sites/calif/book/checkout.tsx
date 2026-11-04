"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  FREE_EMAIL_DOMAINS,
  LEVEL_ORDER,
  LEVELS,
  addBusinessDays,
  dateFromIso,
  emailOk,
  fmtLong,
  fmtShort,
  hostOf,
  isBusinessDay,
  isoFromDate,
  naira,
  rootDomainOf,
  totalOf,
  vatOf,
  type LegalDocId,
  type LevelId,
} from "./book-data";
import { Field, LegalModal, Toast, btnLine, btnPrimary, inputClass, linkBtn } from "./book-ui";

const STEPS = ["Scope and date", "Your details", "Review"];

type Form = {
  company: string;
  domain: string;
  apps: string;
  apiUrl: string;
  roles: string;
  notes: string;
  fullName: string;
  position: string;
  email: string;
  phone: string;
  signer: "me" | "other";
  sName: string;
  sEmail: string;
  diffDomain: boolean;
  agreeAuth: boolean;
  agreeTerms: boolean;
};

const emptyForm: Form = {
  company: "",
  domain: "",
  apps: "",
  apiUrl: "",
  roles: "2",
  notes: "",
  fullName: "",
  position: "",
  email: "",
  phone: "",
  signer: "me",
  sName: "",
  sEmail: "",
  diffDomain: false,
  agreeAuth: false,
  agreeTerms: false,
};

// Email verification runs on the server (/api/otp/*). `ticket` proves a code
// was sent; `token` proves the email was verified and is sent with the booking.
type Otp = { ticket: string | null; sentTo: string | null; verifiedEmail: string | null; token: string | null; coolUntil: number };
const emptyOtp: Otp = { ticket: null, sentTo: null, verifiedEmail: null, token: null, coolUntil: 0 };

async function postJson<T>(url: string, body: unknown): Promise<{ ok: boolean; data: T & { error?: string } }> {
  try {
    const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    const data = (await res.json().catch(() => ({}))) as T & { error?: string };
    return { ok: res.ok, data };
  } catch {
    return { ok: false, data: { error: "Network error. Check your connection and try again." } as T & { error?: string } };
  }
}

const subscribeNoop = () => () => {};
const useMounted = () => useSyncExternalStore(subscribeNoop, () => true, () => false);

function roleOptions(level: LevelId) {
  const t = LEVELS[level];
  const max = t.roles === 99 ? 10 : t.roles;
  return Array.from({ length: max }, (_, i) => (t.roles === 99 && i === 9 ? "10 or more" : String(i + 1)));
}

export function Checkout({ initialLevel }: { initialLevel: LevelId }) {
  const mounted = useMounted();
  const [level, setLevel] = useState<LevelId>(initialLevel);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<Form>(emptyForm);
  const [date, setDate] = useState<string | null>(null);
  const [showLater, setShowLater] = useState(false);
  const [bad, setBad] = useState<Set<keyof Form | "date">>(new Set());
  const [missing, setMissing] = useState("");
  const [otp, setOtp] = useState<Otp>(emptyOtp);
  const [otpInput, setOtpInput] = useState("");
  const [otpMsg, setOtpMsg] = useState("");
  const [now, setNow] = useState(0);
  const [doc, setDoc] = useState<LegalDocId | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState("");
  const [sending, setSending] = useState(false);
  const [checking, setChecking] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);
  const panelRef = useRef<HTMLDivElement>(null);

  const t = LEVELS[level];
  const closeDoc = useCallback(() => setDoc(null), []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3000);
  }, []);

  // Resend cooldown ticker
  useEffect(() => {
    if (otp.coolUntil <= Date.now()) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [otp.coolUntil]);
  const coolLeft = Math.max(0, Math.ceil((otp.coolUntil - (now || otp.coolUntil)) / 1000));

  // ---------- derived ----------
  const domainRoot = (() => {
    const h = hostOf(form.domain);
    return h ? rootDomainOf(h) : "";
  })();
  const appList = form.apps.split(/[\s,;]+/).map(hostOf).filter(Boolean);

  const today = (() => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    return d;
  })();
  const quickDates: Date[] = [];
  if (mounted) {
    quickDates.push(addBusinessDays(today, 2));
    while (quickDates.length < 5) quickDates.push(addBusinessDays(quickDates[quickDates.length - 1], 1));
  }
  const quickIso = quickDates.map(isoFromDate);
  const isLater = !!date && !quickIso.includes(date);

  const emailDomain = form.email.split("@")[1]?.toLowerCase() ?? "";
  const mismatch: false | "free" | "other" = !emailDomain
    ? false
    : FREE_EMAIL_DOMAINS.includes(emailDomain)
      ? "free"
      : domainRoot && rootDomainOf(emailDomain) !== domainRoot
        ? "other"
        : false;

  // ---------- helpers ----------
  const update = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (bad.has(key)) setBad((b) => { const n = new Set(b); n.delete(key); return n; });
  };

  const goToStep = (n: 1 | 2 | 3) => {
    setStep(n);
    setMissing("");
    const top = (panelRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 110;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  const changeLevel = (id: LevelId) => {
    setLevel(id);
    const opts = roleOptions(id);
    if (!opts.includes(form.roles)) update("roles", opts[Math.min(opts.length, 2) - 1]);
    window.history.replaceState(null, "", `/book/checkout?level=${id}`);
  };

  const pickLater = (iso: string) => {
    if (!iso || !quickIso[0]) return;
    let d = dateFromIso(iso);
    let moved = false;
    const min = dateFromIso(quickIso[0]);
    if (d < min) { d = min; moved = true; }
    while (!isBusinessDay(d)) { d.setDate(d.getDate() + 1); moved = true; }
    setDate(isoFromDate(d));
    setBad((b) => { const n = new Set(b); n.delete("date"); return n; });
    if (moved) showToast("Moved to the next available weekday, " + fmtShort(d));
  };

  // ---------- step 1 ----------
  const submitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    const m: string[] = [];
    const b = new Set<keyof Form | "date">();
    if (!form.company.trim()) { b.add("company"); m.push("your company name"); }
    if (!domainRoot || !domainRoot.includes(".")) { b.add("domain"); m.push("your company domain"); }
    if (appList.length > t.apps) {
      b.add("apps");
      m.push(`no more than ${t.apps} app${t.apps > 1 ? "s" : ""} for ${t.name} (choose Sentinel for up to 3, or ask us for a quote)`);
    }
    if (!date) { b.add("date"); m.push("a start date"); }
    setBad(b);
    if (m.length) { setMissing("Please add " + m.join(", ") + "."); return; }
    goToStep(2);
  };

  // ---------- email verification (server) ----------
  const resetOtp = (msg = "") => {
    setOtp((o) => ({ ...emptyOtp, coolUntil: o.coolUntil }));
    setOtpInput("");
    setOtpMsg(msg);
  };

  const sendCode = async () => {
    const em = form.email.trim();
    if (!emailOk(em)) {
      setBad((b) => new Set(b).add("email"));
      setOtpMsg("Enter a valid work email first.");
      return;
    }
    setSending(true);
    const { ok, data } = await postJson<{ ticket: string }>("/api/otp/send", { email: em });
    setSending(false);
    if (!ok) { setOtpMsg(data.error ?? "We couldn't send the code. Try again."); return; }
    const nowMs = Date.now();
    setOtp({ ticket: data.ticket, sentTo: em, verifiedEmail: null, token: null, coolUntil: nowMs + 30 * 1000 });
    setNow(nowMs);
    setOtpInput("");
    setOtpMsg(`We sent a 6-digit code to ${em}. It expires in 10 minutes. Check your spam folder if it doesn't arrive.`);
  };

  const verifyCode = async (value = otpInput) => {
    const c = value.trim();
    if (!otp.ticket) { setOtpMsg("Send a code first."); return; }
    if (!/^\d{6}$/.test(c)) { setOtpMsg("Enter the 6-digit code from the email."); return; }
    setChecking(true);
    const { ok, data } = await postJson<{ verified: string }>("/api/otp/verify", { ticket: otp.ticket, code: c, email: form.email.trim() });
    setChecking(false);
    if (!ok) { setOtpMsg(data.error ?? "That code doesn't match. Check it and try again."); return; }
    setOtp((o) => ({ ...o, verifiedEmail: form.email.trim().toLowerCase(), token: data.verified }));
    setOtpMsg("");
    setMissing("");
    setBad((b) => { const n = new Set(b); n.delete("email"); return n; });
  };

  const verified = !!otp.token && otp.verifiedEmail === form.email.trim().toLowerCase();

  // ---------- step 2 ----------
  const submitStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    const m: string[] = [];
    const b = new Set<keyof Form | "date">();
    ([["fullName", "your name"], ["position", "your position"], ["phone", "a phone number"]] as const).forEach(([k, label]) => {
      if (!form[k].trim()) { b.add(k); m.push(label); }
    });
    if (!emailOk(form.email.trim())) { b.add("email"); m.push("a valid work email"); }
    else if (!verified) { b.add("email"); m.push("email verification (send and enter the code)"); }
    else if (mismatch && !form.diffDomain) m.push("the email domain confirmation");
    if (form.signer === "other") {
      if (!form.sName.trim()) { b.add("sName"); m.push("the signer's name"); }
      if (!emailOk(form.sEmail.trim())) { b.add("sEmail"); m.push("the signer's email"); }
    }
    if (!form.agreeAuth) m.push("confirmation that you're authorised to request testing");
    if (!form.agreeTerms) m.push("your agreement to the terms");
    setBad(b);
    if (m.length) { setMissing("Please add " + m.join(", ") + "."); return; }
    goToStep(3);
  };

  // ---------- step 3: create the invoice on the server ----------
  const generateInvoice = async () => {
    if (!date || !otp.token) return;
    setGenerating(true);
    setGenError("");
    const { ok, data } = await postJson<{ url: string }>("/api/bookings", {
      ...form,
      level,
      start: date,
      verified: otp.token,
    });
    if (!ok) {
      setGenerating(false);
      setGenError(data.error ?? "We couldn't create your invoice. Please try again.");
      return;
    }
    window.location.assign(data.url);
  };

  const signerText = form.signer === "other" ? `${form.sName} (${form.sEmail})` : `${form.fullName} (you)`;

  // ---------- render ----------
  const summaryRows: [string, string][] = [
    ["Company", form.company.trim() || "–"],
    ["Domain", domainRoot || "–"],
    ["App", appList.join(", ") || "To agree"],
    ["User types", form.roles || "–"],
    ["Start", date ? fmtLong(dateFromIso(date)) : "–"],
  ];

  return (
    <div className="mx-auto max-w-screen-xl px-3 lg:px-6">
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/book#pricing" className="text-white/60 hover:text-white">← Back to pricing</Link>
        <ol aria-label="Booking progress" className="flex flex-wrap gap-x-2 gap-y-2 text-sm">
          {STEPS.map((s, i) => {
            const n = i + 1;
            const done = n < step;
            const cur = n === step;
            return (
              <li key={s} aria-current={cur ? "step" : undefined} className={`flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 font-medium ${cur ? "border border-white/15 bg-white/5 text-white" : done ? "text-white/70" : "text-white/50"}`}>
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${cur ? "bg-accent text-white" : done ? "border border-accent text-accent" : "bg-white/10 text-white/70"}`}>
                  {done ? "✓" : n}
                </span>
                {s}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div ref={panelRef} className="rounded-lg border border-white/10 bg-secondary p-6 lg:p-10">
          {step === 1 && (
            <form onSubmit={submitStep1} noValidate className="flex flex-col gap-8">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">Step 1 of 3</p>
                <h2 className="mb-2 text-2xl font-semibold text-white lg:text-3xl">What should we test, and when?</h2>
                <p className="text-white/60">You&apos;ll share test accounts later, through a secure link.</p>
              </div>

              <fieldset className="border-b border-white/10 pb-8">
                <legend className="mb-3 font-semibold text-white">Level</legend>
                <div className="flex flex-wrap gap-2">
                  {LEVEL_ORDER.map((id) => (
                    <label key={id} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3.5 font-semibold ${level === id ? "border-accent bg-accent/10 text-white" : "border-white/15 text-white hover:border-white/30"}`}>
                      <input type="radio" name="level" value={id} checked={level === id} onChange={() => changeLevel(id)} className="h-4 w-4 accent-[#d97706]" />
                      <span className="tabular-nums">
                        {LEVELS[id].name} · {naira(LEVELS[id].price)}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Company name" htmlFor="company" bad={bad.has("company")}>
                  <input id="company" autoComplete="organization" className={inputClass} value={form.company} onChange={(e) => update("company", e.target.value)} />
                </Field>
                <Field label="Company domain" htmlFor="domain" bad={bad.has("domain")} hint="We use this to confirm you own what we test.">
                  <input id="domain" inputMode="url" placeholder="yourcompany.com" className={inputClass} value={form.domain} onChange={(e) => update("domain", e.target.value)} />
                </Field>
                <Field
                  full
                  optional
                  htmlFor="apps"
                  bad={bad.has("apps")}
                  label={t.apps > 1 ? "Which apps should we test?" : "Which app should we test?"}
                  hint={t.apps > 1
                    ? `${t.name} covers up to ${t.apps} apps. Separate them with commas. Not sure? We'll agree the exact scope with you.`
                    : `${t.name} covers 1 app on your domain. Not sure which? We'll agree the exact scope with you.`}
                >
                  <input id="apps" inputMode="url" placeholder={t.apps > 1 ? "app.yourcompany.com, merchant.yourcompany.com" : "app.yourcompany.com"} className={inputClass} value={form.apps} onChange={(e) => update("apps", e.target.value)} />
                </Field>
                {t.api && (
                  <Field label="API address or docs" optional htmlFor="apiUrl">
                    <input id="apiUrl" inputMode="url" placeholder="api.yourcompany.com" className={inputClass} value={form.apiUrl} onChange={(e) => update("apiUrl", e.target.value)} />
                  </Field>
                )}
                <Field
                  label="Types of user"
                  htmlFor="roles"
                  hint={t.roles === 99 ? "Every user type is covered." : `${t.name} covers up to ${t.roles}, for example customers, merchants and admins.`}
                >
                  <select id="roles" className={inputClass} value={form.roles} onChange={(e) => update("roles", e.target.value)}>
                    {roleOptions(level).map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className={`rounded-md ${bad.has("date") ? "outline outline-1 outline-offset-8 outline-red-400" : ""}`}>
                <h3 className="mb-1 text-lg font-semibold text-white">Start date</h3>
                <p className="mb-4 text-sm text-white/50">
                  {t.name} takes about {t.days} working days. The earliest start is 2 business days from today.
                </p>
                <div role="group" aria-label="Start dates" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {quickDates.map((d) => {
                    const iso = isoFromDate(d);
                    const pressed = date === iso;
                    return (
                      <button
                        key={iso}
                        type="button"
                        aria-pressed={pressed}
                        onClick={() => { setDate(iso); setShowLater(false); setBad((b) => { const n = new Set(b); n.delete("date"); return n; }); }}
                        className={`flex flex-col rounded-md border px-4 py-3 text-left ${pressed ? "border-accent bg-accent/10" : "border-white/15 hover:border-white/30"}`}
                      >
                        <b className="font-semibold text-white">{fmtShort(d)}</b>
                        <span className="text-xs text-white/50">Ends about {fmtShort(addBusinessDays(d, t.days - 1))}</span>
                      </button>
                    );
                  })}
                  {mounted && (
                    <button
                      type="button"
                      aria-pressed={isLater}
                      onClick={() => setShowLater(true)}
                      className={`flex flex-col rounded-md border px-4 py-3 text-left ${isLater ? "border-accent bg-accent/10" : "border-dashed border-white/25 hover:border-white/40"}`}
                    >
                      <b className="font-semibold text-white">{isLater && date ? fmtShort(dateFromIso(date)) : "Later date"}</b>
                      <span className="text-xs text-white/50">
                        {isLater && date ? "Ends about " + fmtShort(addBusinessDays(dateFromIso(date), t.days - 1)) : "Pick from calendar"}
                      </span>
                    </button>
                  )}
                </div>
                {(showLater || isLater) && (
                  <div className="mt-4 max-w-[280px]">
                    <Field label="Choose a later start date" htmlFor="laterDate" hint="Weekdays only.">
                      <input id="laterDate" type="date" min={quickIso[0]} className={`${inputClass} [color-scheme:dark]`} value={isLater && date ? date : ""} onChange={(e) => pickLater(e.target.value)} />
                    </Field>
                  </div>
                )}
              </div>

              <Field label="Anything we should know?" optional htmlFor="notes">
                <textarea id="notes" rows={4} placeholder="Key flows, areas to avoid, preferred testing hours" className={`${inputClass} border-white/15`} value={form.notes} onChange={(e) => update("notes", e.target.value)} />
              </Field>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/book#pricing" className={btnLine}>Back</Link>
                <button type="submit" className={btnPrimary}>Continue</button>
                <p aria-live="polite" className="w-full text-sm text-red-400">{missing}</p>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={submitStep2} noValidate className="flex flex-col gap-8">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">Step 2 of 3</p>
                <h2 className="mb-2 text-2xl font-semibold text-white lg:text-3xl">Your details</h2>
                <p className="text-white/60">For your invoice and the authorisation letter. No account needed.</p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full name" htmlFor="fullName" bad={bad.has("fullName")}>
                  <input id="fullName" autoComplete="name" className={inputClass} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
                </Field>
                <Field label="Position" htmlFor="position" bad={bad.has("position")}>
                  <input id="position" autoComplete="organization-title" placeholder="e.g. CEO" className={inputClass} value={form.position} onChange={(e) => update("position", e.target.value)} />
                </Field>

                <Field full label="Work email" htmlFor="email" bad={bad.has("email")} hint={`Ideally your @${domainRoot || "your company's domain"} address.`}>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    readOnly={verified}
                    className={inputClass}
                    value={form.email}
                    onChange={(e) => {
                      update("email", e.target.value);
                      if (otp.sentTo && e.target.value.trim() !== otp.sentTo) resetOtp("Email changed. Send a new code.");
                    }}
                  />
                  {verified ? (
                    <p className="flex items-center gap-3 text-sm font-semibold text-emerald-400">
                      ✓ Email verified
                      <button type="button" className={`font-normal ${linkBtn}`} onClick={() => resetOtp()}>
                        Change email
                      </button>
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={sendCode} disabled={coolLeft > 0 || sending} className={btnLine}>
                        {sending ? "Sending…" : coolLeft > 0 ? `Resend in ${coolLeft}s` : otp.sentTo ? "Resend code" : "Send code"}
                      </button>
                      <input
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        placeholder="6-digit code"
                        aria-label="Verification code"
                        disabled={!otp.ticket || checking}
                        className={`${inputClass} w-[170px] border-white/15 font-mono tracking-[0.2em]`}
                        value={otpInput}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                          setOtpInput(v);
                          if (v.length === 6) verifyCode(v);
                        }}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); verifyCode(); } }}
                      />
                      <button type="button" onClick={() => verifyCode()} disabled={!otp.ticket || checking} className={btnLine}>{checking ? "Checking…" : "Verify"}</button>
                    </div>
                  )}
                  {otpMsg && <p aria-live="polite" className="text-sm text-white/60">{otpMsg}</p>}
                </Field>

                <Field label="Phone or WhatsApp" htmlFor="phone" bad={bad.has("phone")}>
                  <input id="phone" type="tel" autoComplete="tel" placeholder="+234" className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                </Field>

                {mismatch && (
                  <div className="flex flex-col gap-3 rounded-md border border-amber-400/40 bg-amber-400/10 p-4 sm:col-span-2">
                    <p className="text-sm text-amber-200">
                      {mismatch === "free"
                        ? `This looks like a personal email. A work email on ${domainRoot || "your company's domain"} lets us confirm your authority faster.`
                        : `This email isn't on ${domainRoot}, the domain you asked us to test.`}
                    </p>
                    <label className="flex items-start gap-3 text-sm text-white/80">
                      <input type="checkbox" className="mt-1 accent-[#d97706]" checked={form.diffDomain} onChange={(e) => update("diffDomain", e.target.checked)} />
                      That&apos;s fine. I understand Drocol will confirm my link to the domain before testing starts.
                    </label>
                  </div>
                )}

                <fieldset className="sm:col-span-2">
                  <legend className="mb-3 text-sm font-medium text-white/80">Who signs the authorisation letter?</legend>
                  <div className="flex gap-2">
                    {(["me", "other"] as const).map((v) => (
                      <label key={v} className={`flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2 text-sm ${form.signer === v ? "border-accent bg-accent/10 text-white" : "border-white/15 text-white/70"}`}>
                        <input type="radio" name="signer" value={v} checked={form.signer === v} onChange={() => update("signer", v)} className="accent-[#d97706]" />
                        {v === "me" ? "Me" : "Someone else"}
                      </label>
                    ))}
                  </div>
                </fieldset>
                {form.signer === "other" && (
                  <>
                    <Field label="Their name" htmlFor="sName" bad={bad.has("sName")}>
                      <input id="sName" className={inputClass} value={form.sName} onChange={(e) => update("sName", e.target.value)} />
                    </Field>
                    <Field label="Their work email" htmlFor="sEmail" bad={bad.has("sEmail")}>
                      <input id="sEmail" type="email" className={inputClass} value={form.sEmail} onChange={(e) => update("sEmail", e.target.value)} />
                    </Field>
                  </>
                )}

                <div className="flex flex-col gap-4 sm:col-span-2">
                  <label className="flex items-start gap-3 text-white/80">
                    <input type="checkbox" className="mt-1.5 accent-[#d97706]" checked={form.agreeAuth} onChange={(e) => update("agreeAuth", e.target.checked)} />
                    <span>
                      My company owns <b className="text-white">{domainRoot || "this domain"}</b> and the apps in this booking, and I&apos;m authorised to request security testing of them.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 text-white/80">
                    <input type="checkbox" className="mt-1.5 accent-[#d97706]" checked={form.agreeTerms} onChange={(e) => update("agreeTerms", e.target.checked)} />
                    <span>
                      I&apos;ve read and agree to Drocol&apos;s{" "}
                      <button type="button" className={linkBtn} onClick={() => setDoc("terms")}>Terms</button>,{" "}
                      <button type="button" className={linkBtn} onClick={() => setDoc("roe")}>Rules of Engagement</button>,{" "}
                      <button type="button" className={linkBtn} onClick={() => setDoc("nda")}>NDA</button> and{" "}
                      <button type="button" className={linkBtn} onClick={() => setDoc("privacy")}>Privacy notice</button>.
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button type="button" className={btnLine} onClick={() => goToStep(1)}>Back</button>
                <button type="submit" className={btnPrimary}>Review booking</button>
                <p aria-live="polite" className="w-full text-sm text-red-400">{missing}</p>
              </div>
            </form>
          )}

          {step === 3 && date && (
            <div className="flex flex-col gap-8">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">Step 3 of 3</p>
                <h2 className="mb-2 text-2xl font-semibold text-white lg:text-3xl">Review your booking</h2>
                <p className="text-white/60">Check the details, then generate your invoice. You&apos;ll pay on the next page.</p>
              </div>
              <dl className="divide-y divide-white/10 rounded-md border border-white/10 px-5">
                {([
                  ["Level", `${t.name} · ${t.days} working days`],
                  ["Company", form.company],
                  ["Domain", domainRoot],
                  ["App to test", appList.join(", ") || "To agree with Drocol"],
                  ["User types", form.roles],
                  ["Testing", `${fmtLong(dateFromIso(date))} to about ${fmtLong(addBusinessDays(dateFromIso(date), t.days - 1))}`],
                  ["Booked by", `${form.fullName}, ${form.position}`],
                  ["Email", `${form.email} ✓`],
                  ["Signs the authorisation", signerText],
                ] as [string, string][]).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-3">
                    <dt className="shrink-0 text-white/50">{k}</dt>
                    <dd className="min-w-0 break-words text-right font-medium text-white">{v}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-6 py-4">
                  <dt className="text-white/50">Total with VAT</dt>
                  <dd className="text-xl font-semibold tabular-nums text-white">{naira(totalOf(t.price))}</dd>
                </div>
              </dl>
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" className={btnLine} onClick={() => goToStep(2)}>Back</button>
                <button type="button" className={btnPrimary} disabled={generating} onClick={generateInvoice}>
                  {generating ? "Creating your invoice…" : "Generate invoice"}
                </button>
                {genError && <p role="alert" className="w-full text-sm text-red-400">{genError}</p>}
              </div>
            </div>
          )}
        </div>

        <aside aria-label="Your booking" className="self-start rounded-lg border border-white/10 bg-secondary p-6 lg:sticky lg:top-28">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">Your booking</p>
          <h3 className="text-2xl font-semibold text-white">{t.name}</h3>
          <p className="mb-5 text-sm text-white/50">{t.facts.map((f) => f[1]).join(" · ")}</p>
          <dl className="mb-5 divide-y divide-white/10 border-y border-white/10 text-sm">
            {summaryRows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5">
                <dt className="text-white/50">{k}</dt>
                <dd className="min-w-0 break-words text-right text-white">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="space-y-2 text-sm tabular-nums">
            <div className="flex justify-between text-white/70"><span>Price</span><span>{naira(t.price)}</span></div>
            <div className="flex justify-between text-white/70"><span>VAT (7.5%)</span><span>{naira(vatOf(t.price))}</span></div>
            <div className="flex justify-between border-t border-white/10 pt-3 text-xl font-semibold text-white"><span>Total</span><span>{naira(totalOf(t.price))}</span></div>
          </div>
        </aside>
      </div>

      {doc && <LegalModal doc={doc} onChange={setDoc} onClose={closeDoc} />}
      <Toast message={toast} />
    </div>
  );
}
