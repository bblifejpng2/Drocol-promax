// Research articles, extracted from drocol.com's published content
// (docs/research/drocol/drocol_main.js.txt). Rendered at /research/[slug].

export type ArticleBlock =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "list" | "takeaways"; items: string[] }
  | { type: "callout"; tone: "info" | "warn"; title: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export type Article = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  role: string;
  intro: string;
  body: ArticleBlock[];
};

export const articles: Article[] = [
  {
    "slug": "ndpa-compliance-in-practice",
    "tag": "Compliance",
    "title": "The NDPA in practice: what compliance actually requires",
    "excerpt": "The practical steps Nigerian organizations need to take, and the common gaps we see.",
    "readTime": "6 min read",
    "date": "12 Feb 2026",
    "author": "Drocol Research",
    "role": "Security Research Team",
    "intro": "The Nigeria Data Protection Act (NDPA) 2023 is Nigeria's first standalone data protection statute. It replaced the 2019 NDPR regulation, created the Nigeria Data Protection Commission (NDPC) as an independent regulator, and applies to every organization that processes the personal data of people in Nigeria — including organizations based outside the country. Three years in, the NDPC is enforcing at an accelerating pace, and 2026 has brought sharper scrutiny to fintech, healthcare, and government-facing processors. Non-compliance can cost up to 2% of annual gross revenue or NGN 10 million, whichever is greater. This guide walks through what the Act actually requires in practice, and the gaps we most often find when assessing Nigerian organizations.",
    "body": [
      {
        "type": "h2",
        "text": "What the Act actually requires"
      },
      {
        "type": "p",
        "text": "The NDPA is deliberately modeled on the GDPR, but it is its own law with its own regulator. Five obligations do most of the compliance work in practice:"
      },
      {
        "type": "list",
        "items": [
          "A documented lawful basis for every processing activity — consent, contract, legal obligation, vital interests, public interest, or legitimate interest (Section 25).",
          "A Data Protection Officer (DPO) for controllers and processors of \"major importance\", who must operate independently and report to the highest management level (Section 31).",
          "Data subject rights that must be operational: access, rectification, erasure, restriction, portability, objection, and protection from automated decision-making (Part IV).",
          "Breach notification to the NDPC without undue delay and no later than 72 hours, with affected individuals notified when the breach creates high risk (Section 40).",
          "Records of processing activities (ROPA), data protection impact assessments (DPIAs) for high-risk processing, and documented cross-border transfer safeguards (Sections 28, 29, 43)."
        ]
      },
      {
        "type": "callout",
        "tone": "info",
        "title": "Extraterritorial reach",
        "text": "The NDPA applies to any organization processing the personal data of data subjects in Nigeria — whether or not the controller is established in Nigeria. If you sell to Nigerian customers or monitor Nigerian users from abroad, the Act applies to you."
      },
      {
        "type": "h2",
        "text": "The compliance checklist we use"
      },
      {
        "type": "p",
        "text": "When we assess an organization, we work through a structured checklist. Each item maps to a specific provision of the Act:"
      },
      {
        "type": "h3",
        "text": "Governance & accountability"
      },
      {
        "type": "list",
        "items": [
          "Appoint a DPO where required under Section 31.",
          "Register with the NDPC as a controller or processor of major importance, if applicable.",
          "Maintain a record of processing activities (ROPA).",
          "Conduct DPIAs for high-risk processing activities.",
          "Publish a data protection policy and assign clear ownership."
        ]
      },
      {
        "type": "h3",
        "text": "Lawful processing & consent"
      },
      {
        "type": "list",
        "items": [
          "Identify and document the lawful basis for every processing activity.",
          "Where consent is the basis, make it freely given, specific, informed, and unambiguous.",
          "Implement a mechanism to withdraw consent at any time.",
          "Treat sensitive personal data only on the permitted grounds in Section 30."
        ]
      },
      {
        "type": "h3",
        "text": "Security safeguards & breach response"
      },
      {
        "type": "list",
        "items": [
          "Implement proportionate technical and organizational measures (Section 27): encryption, access controls, monitoring, testing.",
          "Bind processors with data processing agreements that include security obligations.",
          "Document a breach response procedure with the 72-hour NDPC timeline.",
          "Keep a breach register for every incident, including those below the notification threshold."
        ]
      },
      {
        "type": "callout",
        "tone": "warn",
        "title": "The gaps we actually see",
        "text": "In our assessments, the same gaps recur: privacy notices that exist but are not shown at the point of collection, consent that was never recorded with timestamps, processors with no written agreement, and cross-border transfers with no documented lawful basis or adequacy assessment. None of these are hard to fix — they just never make it onto a roadmap."
      },
      {
        "type": "h2",
        "text": "What non-compliance costs"
      },
      {
        "type": "p",
        "text": "The NDPC enforces through administrative sanctions, enforcement notices, suspension of processing, audits, and referral for criminal prosecution. The headline penalties:"
      },
      {
        "type": "table",
        "headers": [
          "Violation",
          "Penalty"
        ],
        "rows": [
          [
            "Non-compliance by a controller of major importance",
            "Up to 2% of annual gross revenue or NGN 10,000,000, whichever is greater"
          ],
          [
            "Non-compliance by other controllers/processors",
            "Up to 2% of annual gross revenue or NGN 2,000,000, whichever is greater"
          ],
          [
            "Failure to register where required",
            "Administrative sanctions; possible suspension of processing"
          ],
          [
            "Failure to notify a breach within 72 hours",
            "Fines and enforcement notices"
          ],
          [
            "Obstruction of an NDPC investigation",
            "Criminal prosecution and additional fines"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "Building compliance that lasts"
      },
      {
        "type": "p",
        "text": "Compliance is not a one-off project. Organizations that pass an audit and then stop drift back within a quarter. A sustainable program treats every obligation as a tracked risk with an owner, a deadline, and evidence:"
      },
      {
        "type": "list",
        "items": [
          "Put every NDPA obligation into your risk register with a named owner and attached evidence.",
          "Re-run DPIAs whenever processing changes materially, and review existing ones annually.",
          "Train staff at onboarding and annually — on data handling, subject requests, and breach recognition.",
          "Review processor agreements and request evidence of processor compliance on a regular cycle.",
          "Automate tracking: spreadsheet compliance stops scaling the moment requests, vendors, or systems grow."
        ]
      },
      {
        "type": "takeaways",
        "items": [
          "The NDPA applies to almost every organization handling Nigerian personal data — including foreign ones.",
          "Five obligations carry most of the weight: lawful basis, DPO, subject rights, 72-hour breach notification, and documented transfers.",
          "The most common gaps are operational, not legal: notices not shown at collection, unrecorded consent, unwritten processor agreements.",
          "Penalties reach 2% of annual gross revenue or NGN 10 million — whichever is greater.",
          "Compliance only holds when obligations are tracked with owners, deadlines, and evidence."
        ]
      }
    ]
  },
  {
    "slug": "inside-a-penetration-test",
    "tag": "Offensive Security",
    "title": "Inside a penetration test: what happens, what you receive, and how to prepare",
    "excerpt": "A clear walkthrough of a professional engagement, written for teams commissioning their first test.",
    "readTime": "8 min read",
    "date": "28 Jan 2026",
    "author": "Drocol Research",
    "role": "Security Research Team",
    "intro": "A penetration test is a controlled, authorized attempt to break into your own systems — by the same routes an attacker would use — so you learn what's actually reachable before someone with bad intentions does. It is not a vulnerability scan, and it is not a guarantee of security. It is a point-in-time assessment with defined scope, rules, and deliverables. For organizations in Nigeria and across Africa — where attackers increasingly target fintech rails, mobile money, and government platforms — a well-run engagement is one of the fastest ways to understand what is genuinely exposed. Here is what happens before, during, and after a professional engagement, and how to get the most value out of your first one.",
    "body": [
      {
        "type": "h2",
        "text": "Before the engagement: scoping is everything"
      },
      {
        "type": "p",
        "text": "The quality of a penetration test is decided before the first packet is sent. Scoping defines what is in bounds, what is out, and how the test may run:"
      },
      {
        "type": "list",
        "items": [
          "In-scope assets: the exact domains, IP ranges, applications, APIs, and devices the test covers.",
          "Rules of engagement: approved hours, tested user accounts, whether destructive or denial-of-service techniques are permitted.",
          "Access: credentials for authenticated testing — testing without them only finds what an anonymous attacker sees.",
          "Contacts: who the testers call if something goes wrong, and who authorizes emergency actions.",
          "Legal authority: a signed statement of authorization covering every in-scope asset, including third-party infrastructure."
        ]
      },
      {
        "type": "callout",
        "tone": "warn",
        "title": "Unscoped tests fail quietly",
        "text": "The most common first-engagement mistake is an asset list that does not match reality — an acquired domain, a forgotten API, a staging environment on a public IP. If it is not in scope, it will not be tested. Spend the time reconciling the asset list before you sign."
      },
      {
        "type": "callout",
        "tone": "info",
        "title": "The Nigerian and African context",
        "text": "Real-world engagements here add considerations foreign playbooks miss: USSD and mobile-money flows that sit outside typical web scoping, agents and field staff working on shared devices, cloud infrastructure hosted abroad (which triggers NDPA cross-border transfer rules), and incident-response teams that may need to work with limited local tooling. Build these into the scope and rules of engagement from day one."
      },
      {
        "type": "h2",
        "text": "What actually happens during the test"
      },
      {
        "type": "p",
        "text": "A professional test moves through the same phases an attacker would, but disciplined and documented:"
      },
      {
        "type": "table",
        "headers": [
          "Phase",
          "What happens",
          "What it produces"
        ],
        "rows": [
          [
            "Reconnaissance",
            "Mapping the external attack surface — domains, certificates, exposed services",
            "An asset and exposure inventory"
          ],
          [
            "Enumeration",
            "Extracting detail from reachable services — versions, users, endpoints, misconfigurations",
            "A list of candidate weaknesses"
          ],
          [
            "Exploitation",
            "Proving that weaknesses are reachable with working proof-of-concepts",
            "Confirmed, reproducible findings"
          ],
          [
            "Pivoting",
            "Using one foothold to reach deeper systems and data",
            "An internal attack-path map"
          ],
          [
            "Reporting",
            "Validating, de-duplicating, prioritizing, and explaining every finding",
            "The final report and remediation guide"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "What you receive"
      },
      {
        "type": "p",
        "text": "The report is the deliverable that matters, and a good one is written for two readers. An executive summary in plain language — what was tested, what was found, what it means for the business — followed by technical detail for your engineering team:"
      },
      {
        "type": "list",
        "items": [
          "An executive summary with a risk profile and the findings that matter most.",
          "Every confirmed finding with severity, evidence (screenshots, requests, logs), and reproducible steps.",
          "Attack paths that connect individual findings into the business impact they create.",
          "Clear, prioritized remediation guidance — the fix, the owner, and the effort involved.",
          "A re-test procedure so you can verify fixes actually landed."
        ]
      },
      {
        "type": "h2",
        "text": "How to prepare for your first test"
      },
      {
        "type": "list",
        "items": [
          "Reconcile your asset inventory with the scoping document before kickoff.",
          "Provide authenticated access and realistic test accounts — surface-level testing wastes the budget.",
          "Brief your engineering and operations teams so an unexpected alert does not turn into an incident response.",
          "Plan how findings will be triaged and fixed before the report lands, not after.",
          "Book the re-test into the calendar at the same time as the initial engagement."
        ]
      },
      {
        "type": "takeaways",
        "items": [
          "Scoping decides the outcome — reconcile assets, rules of engagement, and legal authority before kickoff.",
          "The engagement mirrors real attacker methodology: recon, enumeration, exploitation, pivoting, reporting.",
          "The report is the product: executive summary for leadership, evidence and remediation for engineering.",
          "Authenticated testing with realistic accounts is dramatically more valuable than surface scanning.",
          "Fix what you find, then re-test — an engagement without verification is a report without a conclusion."
        ]
      }
    ]
  },
  {
    "slug": "ai-in-security-assessments",
    "tag": "Technology",
    "title": "AI in security assessments: where automation helps, and where it doesn't",
    "excerpt": "An honest look at what machines do well, what they miss, and why expert judgment still decides what matters.",
    "readTime": "5 min read",
    "date": "5 Feb 2026",
    "author": "Drocol Research",
    "role": "Security Research Team",
    "intro": "Every security vendor now claims AI. Most of it is marketing. But beneath the hype, the technology genuinely changes how assessments are done — for the better, in specific and explainable ways. The discipline is knowing what to automate, what to leave to humans, and why the boundary between the two is exactly where quality is won or lost.",
    "body": [
      {
        "type": "h2",
        "text": "What automation genuinely does well"
      },
      {
        "type": "p",
        "text": "A large share of security assessment work is repetitive, rules-based, and exhaustive in a way humans are bad at. This is where machines are unambiguously better:"
      },
      {
        "type": "list",
        "items": [
          "Broad, repeatable coverage — scanning every host, endpoint, and configuration at a scale and consistency no team can match manually.",
          "Correlating signals across huge datasets — version histories, exposure feeds, code patterns — faster than a human can read them.",
          "Mapping candidate attack paths by chaining findings and infrastructure relationships automatically.",
          "Performing routine validation checks and re-tests, so remediation can be verified continuously rather than annually."
        ]
      },
      {
        "type": "callout",
        "tone": "info",
        "title": "Speed without judgment is noise",
        "text": "An automated scanner can produce thousands of results in an afternoon. Without expert triage, that output is a liability — it buries the two findings that matter under two thousand that do not. Automation accelerates the work; it does not replace the decision about what the work means."
      },
      {
        "type": "h2",
        "text": "Where machines fall short"
      },
      {
        "type": "callout",
        "tone": "info",
        "title": "Why this matters for African organizations",
        "text": "The gap between automated output and judgment is wider in the African context: many organizations run lean security teams, digital services like fintech and government platforms move fast, and regulators — the NDPC under the NDPA, and GDPR for EU-facing firms — increasingly expect findings that are explained, not just listed. An unvalidated scan result is not a finding; it is noise a regulator or board will rightly question."
      },
      {
        "type": "list",
        "items": [
          "Business context — whether a vulnerability matters depends on what the system does, what data it touches, and how an attacker could chain it into something worse.",
          "False positives and noise — automated findings need validation against real reachability, real configuration, real impact.",
          "Judgment calls under pressure — during an incident or a negotiation, the question is rarely \"is this vulnerable?\" and almost always \"what should we do about it now?\".",
          "Communication — translating technical risk into decisions a board, a regulator, or a partner can act on is a human skill."
        ]
      },
      {
        "type": "h2",
        "text": "Why the boundary decides quality"
      },
      {
        "type": "p",
        "text": "The organizations that get the most from AI in security are the ones that draw the line deliberately. Automated systems do the broad, repeatable, verifiable work. Certified humans own the parts where context and judgment matter: interpreting findings, deciding what is real, validating what matters, and explaining it in terms the business can act on."
      },
      {
        "type": "p",
        "text": "Every finding that reaches a client should have passed through that human gate. If a report cannot be traced back to an expert who validated and explained it, the automation has not improved security — it has just scaled the noise."
      },
      {
        "type": "takeaways",
        "items": [
          "Automation is best at broad coverage, correlation, attack-path mapping, and re-verification.",
          "Machines cannot provide business context, kill false positives, or communicate risk — and pretending they can is how bad reports get produced.",
          "The quality boundary is explicit: automate the repeatable work, validate everything with certified expertise.",
          "Every client-facing finding should be reviewed, validated, and explained by a human expert."
        ]
      }
    ]
  }
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
