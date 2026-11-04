// Booking content — ported from "Drocol Booking Prototype.html".
// Prices are excluding VAT. Keep the server as the source of truth once a
// real backend exists (see docs/research/drocol-booking/BUILD-NOTES.md).

export const VAT_RATE = 0.075;
export const WHATSAPP = "2348136420014";

export type LevelId = "essentials" | "assured" | "advanced" | "sentinel";

export type Level = {
  name: string;
  price: number;
  days: number;
  /** Max user types; 99 means all. */
  roles: number;
  apps: number;
  api: boolean;
  recommended?: boolean;
  tagline: string;
  fit: string;
  facts: [string, string][];
  plusLabel: string;
  features: string[];
};

export const LEVEL_ORDER: LevelId[] = ["essentials", "assured", "advanced", "sentinel"];

export const LEVELS: Record<LevelId, Level> = {
  essentials: {
    name: "Essentials",
    price: 1100000,
    days: 4,
    roles: 2,
    apps: 1,
    api: false,
    tagline: "Your first real security check.",
    fit: "early-stage products with one web app.",
    facts: [["Testing", "4 working days"], ["Covers", "1 web app"], ["User types", "Up to 2"]],
    plusLabel: "Includes",
    features: [
      "Login and session security",
      "OWASP Top 10 vulnerabilities",
      "Configuration and encryption",
      "Retest of critical and high findings",
    ],
  },
  assured: {
    name: "Assured",
    price: 2400000,
    days: 7,
    roles: 3,
    apps: 1,
    api: true,
    tagline: "Your app and its API, tested by hand.",
    fit: "apps with paying customers and an API behind them.",
    facts: [["Testing", "7 working days"], ["Covers", "1 web app + API"], ["User types", "Up to 3"]],
    plusLabel: "Everything in Essentials, plus",
    features: [
      "API testing, up to 50 endpoints",
      "Access control between users",
      "Business logic testing",
      "Full retest and attestation letter",
    ],
  },
  advanced: {
    name: "Advanced",
    price: 3600000,
    days: 12,
    roles: 4,
    apps: 1,
    api: true,
    recommended: true,
    tagline: "For platforms where orders and money move.",
    fit: "platforms with customers, merchants and admins, where orders or payments move.",
    facts: [["Testing", "12 working days"], ["Covers", "1 web app + API"], ["User types", "Up to 4"]],
    plusLabel: "Everything in Assured, plus",
    features: [
      "API testing, up to 100 endpoints, including the API your mobile apps use",
      "Every user type tested against the others",
      "Orders, payments, wallets and payouts",
      "Price, balance and discount tampering checks",
      "Readout call with your team",
    ],
  },
  sentinel: {
    name: "Sentinel",
    price: 6500000,
    days: 17,
    roles: 99,
    apps: 3,
    api: true,
    tagline: "Your whole platform, board-ready.",
    fit: "several apps, cloud infrastructure and board-level reporting.",
    facts: [["Testing", "17 working days"], ["Covers", "Up to 3 web apps + APIs"], ["User types", "All"]],
    plusLabel: "Everything in Advanced, plus",
    features: [
      "APIs up to 200 endpoints",
      "Fraud and abuse testing at scale",
      "Attack paths showing business impact",
      "Cloud configuration review",
      "Two retests and a board-ready summary",
    ],
  },
};

export function isLevelId(value: unknown): value is LevelId {
  return typeof value === "string" && (LEVEL_ORDER as string[]).includes(value);
}

export type CompareValue = string | boolean;

export const COMPARE: [string, CompareValue[]][] = [
  ["Testing time", ["4 working days", "7 working days", "12 working days", "17 working days"]],
  ["Web apps", ["1", "1", "1", "Up to 3"]],
  ["API endpoints", [false, "Up to 50", "Up to 100", "Up to 200"]],
  ["User types", ["Up to 2", "Up to 3", "Up to 4", "All"]],
  ["OWASP Top 10, login and configuration", [true, true, true, true]],
  ["Access control between users", [false, true, true, true]],
  ["Business logic", [false, true, true, true]],
  ["Orders, payments, wallets and payouts", [false, false, true, true]],
  ["Price, balance and discount tampering", [false, false, true, true]],
  ["Fraud and abuse at scale", [false, false, false, true]],
  ["Cloud configuration review", [false, false, false, true]],
  ["Compliance mapping", ["NDPA", "+ ISO 27001", "+ OWASP ASVS", "+ NIST CSF, SOC 2, CIS"]],
  ["Retest", ["Critical and high", "Full", "Full", "Two full retests"]],
  ["Attestation letter", [false, true, true, true]],
  ["Readout call with your team", [false, false, true, true]],
  ["Board-ready summary", [false, false, false, true]],
];

export const PROOF_POINTS: [string, string][] = [
  ["Fixed price", "In naira, VAT shown upfront"],
  ["Starts in 2 days", "Testing can begin 2 business days after booking"],
  ["Confirmed by a person", "Drocol Core speeds up testing. A person verifies every finding."],
  ["Audit-ready", "Findings mapped to NDPA and ISO 27001"],
];

export const HOW_STEPS = [
  { num: "01", title: "Book", body: "Choose your level and start date, then pay with Paystack.", time: "About 5 minutes" },
  {
    num: "02",
    title: "Get ready",
    body: "Sign the authorisation letter, confirm you own the domain and share test accounts through a secure link. We guide you through it.",
    time: "Before your start date",
  },
  {
    num: "03",
    title: "Test, report, retest",
    body: "We test, flag anything critical the same day, and deliver a prioritised report. Then we retest your fixes.",
    time: "From your start date",
  },
];

export const TESTER = {
  initials: "DA",
  name: "Damilola Agoi-George, CISSP",
  role: "Founder, Drocol",
  bio: "Over six years in information security, across penetration testing, NDPA compliance, ISO 27001 and incident response. Drocol has tested web apps and APIs for platforms handling payments, health records and emergency services.",
};

export const FAQ: { q: string; a: string; contactLink?: boolean }[] = [
  {
    q: "Will testing disrupt our live systems?",
    a: "No. We avoid anything destructive, test in the hours you choose, and tell you straight away if we find something critical. If you have a test copy of your app (often called staging), we can test that instead of your live app. We agree this with you after booking.",
  },
  {
    q: "Does paying mean testing starts?",
    a: "Payment holds your date. Testing starts once the authorisation letter is signed, your domain is confirmed and test accounts are shared.",
  },
  {
    q: "How do you protect our credentials and data?",
    a: "Test accounts come through a secure link, never email or chat, and are deleted when testing ends. Your report goes only to the people you name.",
  },
  {
    q: "Is compliance mapping a certification?",
    a: "No. It shows how your systems measure up against each framework, which supports an audit or certification but doesn't replace one.",
  },
  {
    q: "Our scope doesn't fit a level. What now?",
    a: "with what's in and out of scope, and we'll send a fixed quote within one business day.",
    contactLink: true,
  },
];

export const COMPANY_DETAILS = {
  name: "Drocol Limited",
  address: "Oniru, Victoria Island, Lagos, Nigeria",
  rc: "RC 9626903",
  tin: "2622440264710",
  phone: "+234 813 642 0014",
  email: "info@drocol.com",
};

export type LegalDocId = "terms" | "roe" | "nda" | "privacy";
export type LegalSection = { heading?: string; text?: string; list?: string[] };

export const LEGAL_DOCS: Record<LegalDocId, { tab: string; title: string; sections: LegalSection[] }> = {
  terms: {
    tab: "Terms",
    title: "Terms of Service",
    sections: [
      { text: "Drocol Limited (RC 9626903), Oniru, Victoria Island, Lagos." },
      { heading: "The service", text: "A fixed-scope penetration test at the level you book, with the report, retests and compliance mapping included in that level." },
      { heading: "Price and payment", text: "Prices are fixed in naira, with 7.5% VAT added. You pay through Paystack. A tax invoice follows once payment is confirmed, and your start date is held from then." },
      { heading: "Authorisation comes first", text: "You confirm you own, or are authorised to have tested, every system in your booking. Testing starts only after the authorisation letter is signed, your domain is confirmed and test accounts are shared. Payment alone does not authorise testing." },
      { heading: "Start dates", text: "The earliest start is 2 business days after booking. If the pre-test steps aren't done 2 business days before your start date, we agree a new date with you." },
      { heading: "Scope changes", text: "Anything outside the booked scope is quoted in writing before any extra work." },
      { heading: "Cancellation and liability", text: "Contact us before testing starts if you need to cancel. Cancellation, refunds and liability are set out in the engagement agreement you sign before testing begins." },
      { heading: "Limits of testing", text: "A penetration test examines your systems at a point in time, within the agreed scope. It reduces risk but cannot guarantee every vulnerability is found." },
      { heading: "Governing law", text: "The laws of the Federal Republic of Nigeria." },
    ],
  },
  roe: {
    tab: "Rules of Engagement",
    title: "Rules of Engagement",
    sections: [
      { heading: "Scope", text: "Only the systems, environments and user types in your booking are tested. Anything not listed is out of scope." },
      { heading: "Authorisation", text: "A signed authorisation letter from someone with authority over the systems, plus confirmation that you control the domain." },
      { heading: "Testing window", text: "Testing runs on the agreed dates and hours. We share our source IP addresses before we start." },
      { heading: "What we won't do", list: ["No denial-of-service or destructive actions.", "No data taken beyond what proves access.", "No social engineering unless agreed in writing."] },
      { heading: "Stop conditions", text: "Both sides name an emergency contact. Critical findings are reported as soon as they're confirmed, and testing pauses at your request." },
      { heading: "Credentials and data", text: "Test accounts come through a secure link, are used only for testing and are deleted when the engagement ends." },
      { heading: "Tools", text: "Some testing is assisted by Drocol Core, our AI-assisted testing engine. A person confirms every finding before it reaches your report." },
    ],
  },
  nda: {
    tab: "NDA",
    title: "Non-Disclosure Agreement",
    sections: [
      { heading: "Parties", text: "Drocol Limited and the company named on the booking." },
      { heading: "Confidential information", text: "System details, credentials, findings, reports, business information and anything marked or reasonably understood as confidential." },
      { heading: "Our obligations", text: "We use your information only for the engagement, limit access to the people working on it and protect it with appropriate security." },
      { heading: "Exclusions", text: "Information that is public, already known, independently developed or required by law to be disclosed." },
      { heading: "Deletion", text: "Credentials and test data are deleted when testing ends." },
      { heading: "Publicity", text: "We won't name you as a client or share any details of the engagement without your written permission." },
    ],
  },
  privacy: {
    tab: "Privacy",
    title: "Privacy notice",
    sections: [
      { text: "Drocol Limited, Oniru, Victoria Island, Lagos. Contact: info@drocol.com." },
      { heading: "What we collect", text: "Your name, position, work email, phone, company, payment records and the systems you ask us to test." },
      { heading: "Why", text: "To deliver the engagement, invoice you, confirm you're authorised to have the systems tested, and meet legal and tax obligations." },
      { heading: "Who we share it with", text: "Only the providers needed to run the booking, such as Paystack and our email and messaging services." },
      { heading: "How long we keep it", text: "For the engagement, then as long as tax and legal records require." },
      { heading: "Your rights", text: "Under the Nigeria Data Protection Act 2023 you can ask to access, correct or delete your data, or object to how it's used, by emailing info@drocol.com. You can also complain to the Nigeria Data Protection Commission." },
    ],
  },
};

// ---------- money ----------
export const naira = (n: number) => "₦" + Math.round(n).toLocaleString("en-NG");
export const naira2 = (n: number) =>
  "₦" + n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const vatOf = (price: number) => Math.round(price * VAT_RATE);
export const totalOf = (price: number) => price + vatOf(price);

// ---------- dates (business days, local noon to avoid DST edges) ----------
export const isBusinessDay = (d: Date) => d.getDay() !== 0 && d.getDay() !== 6;

export function addBusinessDays(d: Date, n: number) {
  const x = new Date(d);
  let k = 0;
  while (k < n) {
    x.setDate(x.getDate() + 1);
    if (isBusinessDay(x)) k++;
  }
  return x;
}

export function subBusinessDays(d: Date, n: number) {
  const x = new Date(d);
  let k = 0;
  while (k < n) {
    x.setDate(x.getDate() - 1);
    if (isBusinessDay(x)) k++;
  }
  return x;
}

export const dateFromIso = (iso: string) => new Date(iso + "T12:00:00");
export const isoFromDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const fmtLong = (d: Date) =>
  d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
export const fmtShort = (d: Date) =>
  d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
export const fmtDay = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

// ---------- domains ----------
const SECOND_LEVEL = ["com.ng", "org.ng", "gov.ng", "edu.ng", "net.ng", "co.uk", "org.uk", "co.za", "com.gh", "co.ke", "com.au"];
export const FREE_EMAIL_DOMAINS = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "live.com", "ymail.com", "proton.me", "protonmail.com", "aol.com"];

const normUrl = (u: string) => {
  const t = u.trim();
  if (!t) return "";
  return /^https?:\/\//i.test(t) ? t : "https://" + t;
};

export function hostOf(u: string) {
  try {
    return new URL(normUrl(u)).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

export function rootDomainOf(host: string) {
  const parts = host.split(".");
  if (parts.length < 2) return host;
  const last2 = parts.slice(-2).join(".");
  return SECOND_LEVEL.includes(last2) && parts.length >= 3 ? parts.slice(-3).join(".") : last2;
}

export const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export function newBookingRef() {
  const d = new Date();
  const y = String(d.getFullYear()).slice(2);
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const a = new Uint32Array(4);
  crypto.getRandomValues(a);
  return `DRC-${y}${mo}${da}-` + Array.from(a, (v) => chars[v % chars.length]).join("");
}
