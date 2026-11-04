// Drocol.com homepage content — extracted from source

export const navLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/book" },
  { label: "Company", href: "/company" },
  { label: "Industries", href: "/industries" },
  { label: "Research", href: "/research" },
  { label: "Contact", href: "/contact" },
];

export const heroBadge = "Building the future of cybersecurity";

export const heroHeading = "Helping organizations build confidence in their security.";

export const heroDescription =
  "Drocol helps organizations identify vulnerabilities, manage cyber risk, strengthen their security, and build better security capabilities through expert consulting and technology.";

export const partners = [
  { id: "chowdeck", name: "Chow Deck" },
  { id: "redream", name: "Redream Solutions" },
  { id: "paystacks", name: "Paystacks" },
] as const;

export type PartnerId = (typeof partners)[number]["id"];

// Content from drocol.com "How we help" (src/components/HowWeHelp.tsx in the live bundle)
export type ServiceCategory = {
  id: string;
  num: string;
  label: string;
  tag: string;
  subtitle: string;
  description: string;
  outcomes: string[];
  cta: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "assess",
    num: "01",
    label: "Assess",
    tag: "Offensive Security",
    subtitle: "Find what attackers find — first.",
    description:
      "Penetration testing across web applications, APIs, cloud environments, and internal networks. We show you what an attacker would find before an attacker does. Vulnerability assessments and architecture reviews that give you a clear picture of your real exposure.",
    outcomes: ["Web & API pen testing", "Cloud security review", "Architecture analysis", "Vulnerability assessment"],
    cta: "Talk to us about assessments",
  },
  {
    id: "advise",
    num: "02",
    label: "Advise",
    tag: "Compliance & Strategy",
    subtitle: "Practical guidance, not generic frameworks.",
    description:
      "Compliance, risk management, and security strategy built around how your business actually operates — not generic checklists. NDPA, ISO 27001, CBN guidelines, and industry-specific regulations translated into action your team can execute.",
    outcomes: ["NDPA compliance", "ISO 27001 readiness", "Risk management", "Security strategy"],
    cta: "Talk to us about advisory",
  },
  {
    id: "train",
    num: "03",
    label: "Train",
    tag: "Security Awareness",
    subtitle: "People are your first and last line of defence.",
    description:
      "Practical awareness training that helps your team recognize real-world threats and respond with confidence. Security tools cannot protect an organization whose people are unprepared. We build the human side of your security.",
    outcomes: ["Phishing simulations", "Security awareness", "Incident response drills", "Executive briefings"],
    cta: "Talk to us about training",
  },
  {
    id: "build",
    num: "04",
    label: "Build",
    tag: "AI-Powered Platform",
    subtitle: "Technology that amplifies expert judgment.",
    description:
      "We build AI-powered technology that improves how security assessments are performed — increasing coverage, reducing noise, and giving our consultants more time to solve complex security problems that only humans can solve.",
    outcomes: ["Automated scanning", "Attack path mapping", "AI-assisted triage", "Developer-ready APIs"],
    cta: "Explore our technology",
  },
];

export const servicesIntro = {
  heading: "Every organization's journey is different.",
  subtitle:
    "Our role is to help you understand where you are today and build toward where you need to be tomorrow.",
};

export type Pillar = {
  title: string;
  body: string;
  examples: string[];
};

export const pillarsIntro =
  "A firewall does not make an organization secure. Real security is the result of four things working together — and a weakness in any one of them creates exposure.";

export const pillars: Pillar[] = [
  {
    title: "Technology",
    body: "Tools create visibility — but only what they are configured to see. The right platform accelerates detection and reduces manual effort.",
    examples: ["Threat detection", "Automated scanning", "Attack path mapping"],
  },
  {
    title: "People",
    body: "Skilled professionals interpret what tools surface, make judgment calls under pressure, and communicate risk in business terms.",
    examples: ["Expert analysis", "Incident response", "Risk communication"],
  },
  {
    title: "Process",
    body: "Consistent, documented processes make security repeatable — even when people change and systems evolve.",
    examples: ["Change management", "Vulnerability tracking", "Compliance workflows"],
  },
  {
    title: "Culture",
    body: "Security becomes real when it is part of how the organization operates — not a department, not a checkbox.",
    examples: ["Security awareness", "Leadership buy-in", "Shared responsibility"],
  },
];

export type ApproachStep = {
  num: string;
  title: string;
  description: string;
};

export const approachSteps: ApproachStep[] = [
  { num: "01", title: "Understand", description: "Learn about your organization, environment, objectives, and risks." },
  { num: "02", title: "Assess", description: "Identify vulnerabilities, weaknesses, and security gaps." },
  { num: "03", title: "Prioritize", description: "Determine which risks require immediate attention." },
  { num: "04", title: "Improve", description: "Implement practical security improvements." },
  { num: "05", title: "Verify", description: "Confirm the improvements worked. Close the loop. Repeat." },
];

export const ctaHeading = "Ready to build confidence";

export const ctaDescription =
  "Whether you're preparing for compliance, strengthening your security posture, or building the next generation of digital services — we're here to help.";

export const footerServices = [
  { label: "Assess", href: "/solutions#assess" },
  { label: "Advise", href: "/solutions#advise" },
  { label: "Train", href: "/solutions#train" },
  { label: "Build", href: "/solutions#build" },
];

export const footerNav = [
  { label: "Company", href: "/company" },
  { label: "Industries", href: "/industries" },
  { label: "Research", href: "/research" },
  { label: "Contact", href: "/contact" },
];

// === Solutions page content ===

export const solutionsIntro = {
  label: "Solutions",
  heading: "Security services that meet you where you are.",
  description:
    "Assessments, advisory, training, and the technology that amplifies them — built around how your organization actually operates.",
};

export type SolutionItem = {
  title: string;
  description: string;
  items: string[];
  cta: string;
  anchor: string;
};

export const solutionItems: SolutionItem[] = [
  {
    title: "Assess",
    description:
      "Identify vulnerabilities, weaknesses, and attack paths across your applications, infrastructure, APIs, and cloud environments.",
    items: [
      "Vulnerability Assessment & Penetration Testing",
      "Web Application Security",
      "API Security",
      "External Attack Surface Assessment",
      "Internal Network Security",
      "Cloud Security",
    ],
    cta: "Explore Assessments",
    anchor: "assess",
  },
  {
    title: "Advise",
    description:
      "Practical guidance, not generic frameworks. Compliance, risk management, and security strategy built around your business.",
    items: [
      "Cybersecurity Strategy",
      "Risk Assessment",
      "NDPA Compliance",
      "ISO 27001",
      "PCI DSS",
      "Security Architecture",
      "vCISO",
    ],
    cta: "Explore Advisory",
    anchor: "advise",
  },
  {
    title: "Train",
    description:
      "Build the knowledge and capabilities your people need to recognize, prevent, and respond to security threats.",
    items: [
      "Security Awareness",
      "Cybersecurity Training",
      "Secure Development Training",
      "Incident Response Exercises",
    ],
    cta: "Explore Training",
    anchor: "train",
  },
  {
    title: "Build",
    description:
      "Build security capabilities, automation, and technology that make security more effective and scalable.",
    items: [
      "Security Engineering",
      "Security Automation",
      "AI Security",
      "Security Integrations",
    ],
    cta: "Explore Technology",
    anchor: "build",
  },
];

// === Industries page content ===

export const industriesIntro = {
  heading: "Security that fits your industry.",
  description:
    "Every industry faces different threats, regulations, and operational realities. Understanding those differences is where good security begins — and where we start every engagement.",
};

export type Industry = {
  title: string;
  body: string;
  tags: string[];
};

export const industries: Industry[] = [
  {
    title: "Financial services",
    body: "Nigeria's most regulated sector. Fraud pressure, CBN expectations, and customer trust — all at the same time. Security here must be continuous, not annual.",
    tags: ["CBN Compliance", "NDPA", "PCI DSS"],
  },
  {
    title: "Healthcare",
    body: "Patient records are among the most sensitive data any organization holds. Protecting them is both a legal duty under the NDPA and a matter of basic trust.",
    tags: ["NDPA", "HL7 Security"],
  },
  {
    title: "Technology",
    body: "For SaaS and product companies, security is part of the product. Customers ask hard questions during procurement. Good answers win deals.",
    tags: ["SOC 2", "ISO 27001"],
  },
  {
    title: "Government",
    body: "Public institutions hold data citizens cannot take back. Securing critical services and legacy systems requires patience, precision, and care.",
    tags: ["NITDA Guidelines", "Critical Infra"],
  },
  {
    title: "Manufacturing",
    body: "As operations connect, operational technology meets the internet. Downtime is expensive. Prevention costs less than recovery.",
    tags: ["OT Security", "ICS"],
  },
  {
    title: "Professional services",
    body: "Law firms, accountants, and consultancies are trusted with client secrets and targeted through email. Confidentiality is the business.",
    tags: ["Email Security", "NDPA"],
  },
];

// === Company page content ===

export const companyIntro = {
  heading: "Built in Lagos. Building for the continent.",
  description:
    "Drocol Technologies is a Nigerian cybersecurity company combining expert consulting, original research, and AI-powered technology — so African organizations can secure what matters and move forward with confidence.",
};

export type CompanyPillar = {
  title: string;
  body: string;
};

export const companyPillars: CompanyPillar[] = [
  {
    title: "Expertise",
    body: "Certified consultants who translate security into business language — so risk decisions are made with confidence, not guesswork.",
  },
  {
    title: "Research",
    body: "Original research that maps the threats most relevant to African organizations, published openly to raise the whole market.",
  },
  {
    title: "Education",
    body: "Training and awareness that build real security capability inside every client — so protection survives after we leave.",
  },
  {
    title: "Technology",
    body: "AI-powered tooling that automates the repeatable work, freeing our experts to focus on the complex problems only humans can solve.",
  },
];

// === Research page content ===

export const researchIntro =
  "A long-term research program focused on emerging threats, industry trends, technical analysis, and practical guidance for organizations operating across Africa.";

export const researchItems = [
  { title: "Annual threat reports", tag: "Reports", year: "2026" },
  { title: "Technical publications", tag: "Papers", year: "Ongoing" },
  { title: "Security advisories", tag: "Advisories", year: "Live" },
  { title: "Open-source projects", tag: "Open source", year: "Ongoing" },
  { title: "Vulnerability research", tag: "Research", year: "2026" },
  { title: "Industry analysis", tag: "Analysis", year: "Quarterly" },
  { title: "Case studies", tag: "Studies", year: "Ongoing" },
];

// === Contact page content ===

export type ContactItem = {
  label: string;
  value: string;
  href: string | null;
  desc: string;
};

export const contactItems: ContactItem[] = [
  {
    label: "General Enquiries",
    value: "info@drocol.com",
    href: "mailto:info@drocol.com",
    desc: "For project consultations, partnerships and general questions.",
  },
  {
    label: "Technical Support",
    value: "+234 807 093 9166",
    href: "tel:+2348070939166",
    desc: "For urgent security concerns, incident response and managed clients.",
  },
  {
    label: "Direct Line",
    value: "+234 813 642 0014",
    href: "tel:+2348136420014",
    desc: "Mobile line for urgent requests and follow-ups, available 24/7.",
  },
  {
    label: "Our Location",
    value: "Oniru, Victoria Island, Lagos",
    href: null,
    desc: "Available 24/7, online in any time zone.",
  },
];

// Testimonials — SAMPLE COPY. Replace with real, approved client quotes
// (name, role, company) before launch.
export type Testimonial = {
  initials: string;
  name: string;
  role: string;
  quote: string;
};

export const testimonialsHeading = "Don't take our word for it";

// The quotes below are SAMPLE copy. Keep this false until they are replaced
// with real, approved client quotes; the homepage hides the section until then.
export const SHOW_TESTIMONIALS = false;

// Drocol's Instagram (from drocol.com). Every "Drocol" in a testimonial
// quote is rendered as an orange link to this profile.
export const DROCOL_INSTAGRAM = "https://www.instagram.com/drocol.tech";

export const testimonials: Testimonial[] = [
  {
    initials: "CI",
    name: "Chief Information Security Officer",
    role: "Tier-1 commercial bank, Lagos",
    quote:
      "We've worked with international firms before, but Drocol understood our CBN obligations from day one. Their testers found an access-control flaw in our internet banking platform that two previous audits had missed, and walked our board through the fix in plain language.",
  },
  {
    initials: "HE",
    name: "Head of Engineering",
    role: "Fintech payments platform",
    quote:
      "Drocol tested our wallet and payout APIs a week before launch. Every finding came with a clear proof and a fix our developers could ship the same day. The retest closed everything out, and we launched on time.",
  },
  {
    initials: "CT",
    name: "Chief Technology Officer",
    role: "Logistics and delivery startup",
    quote:
      "No noise, no 200-page report. Drocol told us the five things that actually mattered and why. That's exactly what a growing team needs.",
  },
  {
    initials: "CO",
    name: "Chief Operating Officer",
    role: "Private healthcare group",
    quote:
      "Patient records are our biggest responsibility. Drocol mapped where that data really lives, tightened access across our clinics, and trained our staff to spot phishing. Our NDPA readiness has never been stronger.",
  },
  {
    initials: "IT",
    name: "IT Security Manager",
    role: "Federal agency",
    quote:
      "During a live incident on a Sunday night, Drocol picked up on the first call. They were calm, methodical and fast, and we were contained within hours.",
  },
  {
    initials: "RM",
    name: "Risk and Compliance Lead",
    role: "Insurance provider",
    quote:
      "Drocol turned ISO 27001 from a document exercise into controls our people actually use. The readout call with our executives was the clearest security briefing we've had.",
  },
];

// Company manifesto and mission — from drocol.com (live bundle)
export const companyManifesto = {
  statement:
    "Better security creates stronger organizations. Stronger organizations create a more secure digital future.",
  mission:
    "We exist so African organizations can grow with confidence — building security that becomes the foundation of their success, not a barrier to it. That mission shapes everything we do.",
  why: "Organizations should not have to wait for a breach, failed audit, or security incident to understand their risk. Drocol helps organizations identify weaknesses early, make better security decisions, and build resilience before a crisis happens.",
  future:
    "We're building a company that contributes to the future of cybersecurity through expertise, research, education, and technology.",
};

