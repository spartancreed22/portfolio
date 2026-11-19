// All site content lives here. Edit this file to update the portfolio.
// Rules: only real work. No client or patient data.
// Discretion (since 18-nov-2026): no internal figures (patients, documents, pages, test counts),
// no names of insurers or EPS ("third-party web portals"), no roles, countries or detailed stack
// of the company's own platform, no internal tool replacements. Figures stay for interviews only.

// Public URL of the site. Change it if you rename the domain in Vercel (Settings → Domains).
export const siteUrl = "https://joshua-ortiz-dev.vercel.app";

export const profile = {
  name: "Joshua Ortiz",
  role: "Full-Stack Developer · Automation & AI",
  pitch:
    "I automate the work teams still do by hand: Python bots for web portals with no API, document pipelines, and web apps on Next.js and Oracle.",
  city: "Cali",
  country: "Colombia",
  location: "Cali, Colombia · UTC-5",
  languages: "Spanish (native) · English (professional)",
  availability: "Open to remote contracts",
  links: {
    linkedin: "https://www.linkedin.com/in/joshua-ort%C3%ADz-a785022b0/",
    upwork: "https://www.upwork.com/freelancers/~0135c14b0c8c4bfe39",
    github: "https://github.com/spartancreed22",
  },
};

export const stats = [
  { value: "Python + Playwright", label: "browser and HTTP automation for portals with no API" },
  { value: "Next.js + Oracle", label: "full-stack apps with business logic in PL/SQL" },
  { value: "Tested", label: "every tool ships with automated checks" },
  { value: "Auditable", label: "every run leaves a log with a reason for each miss" },
];

export type Project = {
  slug: string;
  title: string;
  role: string;
  stack: string[];
  metric: { value: string; label: string };
  problem: string;
  approach: string[];
  result: string;
  /** Deeper engineering notes, shown when the visitor expands the card. */
  notes: { title: string; items: string[] }[];
};

export const projects: Project[] = [
  {
    slug: "records-bot",
    title: "Records bot for a legacy third-party portal",
    role: "Sole developer · process automation",
    stack: ["Python", "Playwright", "openpyxl", "Tests with fakes"],
    metric: { value: "Legacy portal", label: "frameset site plus a separate single-page app, driven end to end" },
    problem:
      "Staff downloaded each record from a third-party portal by hand: search, open, filter by professional and date, print to PDF, rename, file.",
    approach: [
      "Navigate by URL instead of menus, search every frame, and wait for content instead of network idle.",
      "Pick the visit closest to the spreadsheet date across all result pages, then check the PDF belongs to the right person.",
      "Mark every spreadsheet row by color and write a CSV audit log that is the single source of truth.",
    ],
    result:
      "Each batch ends with verified PDFs for the rows that have a record and a clear reason for the rows that don't. No row is ever marked done without proof.",
    notes: [
      {
        title: "Hard problems I solved",
        items: [
          "The portal is built on frames, and its entry URL is a launcher that closes itself, so the bot goes straight to the target URLs.",
          "Results load in batches and are paginated; the bot walks every page before deciding which visit is the right one.",
          "Names with accents failed to match until both sides were Unicode-normalized.",
          "A calendar popup covered the results table; the bot now closes it before reading.",
          "Excel turned hexadecimal codes into numbers, so codes are read and written as text.",
          "An old fallback picked the document type blindly and saved the portal's error screen as a PDF. I removed it: if the bot can't confirm, the row fails with a reason.",
        ],
      },
      {
        title: "Reliability",
        items: [
          "Two timeouts: a long one for pages that really load, a short one for elements that may not exist.",
          "Recovers when the browser closes mid-batch and when Excel locks the file while saving.",
          "A stopped run resumes where it left off without repeating finished rows.",
        ],
      },
    ],
  },
  {
    slug: "bulk-lookup",
    title: "High-volume lookup without clicking",
    role: "Sole developer · process automation",
    stack: ["Python", "Playwright", "requests", "Threads", "pypdf"],
    metric: { value: "Hours → minutes", label: "for a lookup the team used to do one record at a time" },
    problem:
      "A billing spreadsheet needed one data point for thousands of people, and it only existed inside a third-party web portal.",
    approach: [
      "Sign in once with Playwright, then call the same JSON endpoints the portal's own screens use, instead of clicking through them.",
      "Read the value from a PDF preview instead of printing, so the portal's print counters stay untouched.",
      "Confirm the ID inside the PDF matches the person before writing anything back.",
    ],
    result:
      "A lookup that used to be manual now runs in minutes, and every record that could not be found is logged with its reason so the team knows exactly what to check by hand.",
    notes: [
      {
        title: "Why it is fast and stable",
        items: [
          "One HTTP session per worker thread with keep-alive connections. Opening a new connection per request made the portal hang.",
          "Automatic re-login when the session expires, without losing progress.",
          "A local cache makes the run resumable: restarting skips records already resolved.",
        ],
      },
      {
        title: "What I would tell a reviewer",
        items: [
          "Using the portal's endpoints is what turned hours of clicking into minutes; the browser is only used to get a valid session.",
          "The bot reads, it never writes: nothing in the portal changes because of it.",
        ],
      },
    ],
  },
  {
    slug: "billing-bundler",
    title: "Billing support-document bundler",
    role: "Sole developer · rewrite of an existing tool",
    stack: ["Python", "Oracle SQL", "pypdf", "Automated tests"],
    metric: { value: "Manual → one run", label: "invoice bundles assembled in the format each payer requires" },
    problem:
      "Payers reject invoices when a supporting document is missing or named wrong, and assembling the bundles by hand was slow and error-prone.",
    approach: [
      "Read the billing spreadsheet, find every document in Oracle and tell the document types apart by procedure code and source table.",
      "Build one bookmarked PDF and one ZIP per invoice, with the exact file names each payer requires.",
      "A review mode reports what is missing before anything is downloaded.",
    ],
    result:
      "While rewriting the previous version I found it could attach another person's record and delete files from earlier runs. Both are fixed and covered by tests.",
    notes: [
      {
        title: "Design decisions",
        items: [
          "Review first, download second: the dry-run mode lets billing staff fix gaps before a bundle is built.",
          "Outputs are never overwritten or deleted; each run writes to its own place.",
          "Every document is matched to the invoice's person before it goes into the bundle.",
        ],
      },
    ],
  },
  {
    slug: "portal-recon",
    title: "Portal reconnaissance recorder",
    role: "Sole developer · groundwork before automating a portal",
    stack: ["Python", "Playwright", "Automated tests"],
    metric: { value: "Safe by default", label: "records a portal before it gets automated, saves nothing unless told to" },
    problem:
      "The next portal to automate submits real requests to a third party. Guessing its fields or flows could create requests nobody intended.",
    approach: [
      "While a person completes the flow by hand, the tool records fields, dropdown options, warnings and network traffic.",
      "It saves nothing to the portal by default; saving or submitting needs an explicit flag.",
    ],
    result:
      "The recording showed the session was dropping because another person was signed in with the same user, a problem that would have looked like a bot bug later.",
    notes: [
      {
        title: "Why build this first",
        items: [
          "A map of the real flow, taken from the real portal, beats assumptions when the action can't be undone.",
          "Safe by default: the dangerous actions are opt-in, never the other way around.",
        ],
      },
    ],
  },
  {
    slug: "incidents-platform",
    title: "Incident and requirements platform",
    role: "Main developer · internal tool",
    stack: ["Next.js", "TypeScript", "Oracle PL/SQL", "DBMS_SCHEDULER"],
    metric: { value: "Tested end to end", label: "database, API and browser checks on every block of work" },
    problem:
      "The team tracked incidents and development requests outside the app, with no SLA control and no audit trail.",
    approach: [
      "Incidents with SLA deadlines, a timeline per case, email only for the serious ones, and printable traceability reports built without a PDF library.",
      "A requirements tracker with status rules, a team timeline and planning by area.",
      "All business rules live in PL/SQL packages; the Next.js layer stays thin.",
    ],
    result:
      "Delivered in small, reviewable blocks with automated checks at the database, API and browser level. Deployments are idempotent and demo data can be removed without touching real records.",
    notes: [
      {
        title: "The key decision",
        items: [
          "The team rule was not to modify an existing alerts package. Instead of editing it, I connected to it as an observer: a scheduled job reads its logs every few minutes.",
          "Trade-off accepted on purpose: a few minutes of delay in exchange for zero risk to a system other teams depend on.",
        ],
      },
      {
        title: "Data integrity",
        items: [
          "The author of every change comes from the signed-in session, never from the request body.",
          "User lists are validated without dynamic SQL.",
          "Each block of work has its own commit and its own tests.",
        ],
      },
    ],
  },
];

export const principles = [
  { title: "Never choose blindly", text: "If a match, a date or a dropdown can't be confirmed, the row fails with a reason instead of guessing." },
  { title: "The original stays untouched", text: "Tools work on a copy. A client's file is never overwritten." },
  { title: "Resume, don't restart", text: "Long runs stop and continue where they left off without repeating work." },
  { title: "Done means verified", text: "A PDF must open, start with %PDF and belong to the right person before a row turns green." },
];

export const experience = [
  {
    period: "May 2026 – Present",
    role: "Junior Full-Stack Developer",
    org: "TeKer · Healthcare (telemedicine) · Colombia",
    points: [
      "In charge of process automation and support.",
      "Python + Playwright automation on third-party web portals and document pipelines for billing.",
      "Built an internal incidents and requirements platform; contribute to the company's web platform with the development team.",
    ],
  },
  {
    period: "Nov 2025 – Apr 2026",
    role: "Front-end Developer",
    org: "Alliance Devs · Remote",
    points: ["Client platforms in React and Angular consuming REST APIs, in agile sprints."],
  },
  {
    period: "Apr 2025 – Jun 2025",
    role: "AI Trainer · Software",
    org: "Outlier · Remote",
    points: ["Prompt design and evaluation of model responses across several LLMs.", "Web tools and Node.js integrations for LLM applications."],
  },
  {
    period: "Feb 2024 – Aug 2024",
    role: "Intern · Data and Operations Support",
    org: "CEMEX Colombia",
    points: ["Data work with Excel, SQL and Power BI; process documentation."],
  },
];

export const skills = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "PL/SQL"] },
  { group: "Automation", items: ["Playwright", "requests", "pandas", "pypdf", "openpyxl"] },
  { group: "Web", items: ["Next.js", "React", "Redux Toolkit", "Tailwind CSS", "Node.js", "Angular"] },
  { group: "Data", items: ["Oracle", "DBMS_SCHEDULER", "Power BI", "Excel"] },
  { group: "Practice", items: ["Git", "Testing with fakes", "AI-assisted development", "Prompt engineering"] },
];

export const education = [
  { org: "SENA", detail: "Technologist in Software Analysis and Development" },
  { org: "Jala University", detail: "Software Engineering (in progress)" },
  { org: "IBM", detail: "Certificate · Generative AI: Prompt Engineering Basics · 2025" },
  { org: "UC Irvine", detail: "Certificate · Problem Solving and Decision Making · 2025" },
];
