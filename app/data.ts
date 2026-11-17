// All site content lives here. Edit this file to update the portfolio.
// Rule: only real work. No client or patient data.

// Public URL of the site. Change it if you rename the domain in Vercel (Settings → Domains).
export const siteUrl = "https://portfolio-five-xi-64.vercel.app";

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
  { value: "5,206", label: "patients found in ~30 minutes by one bot" },
  { value: "713", label: "pages merged into a single audited invoice PDF" },
  { value: "159", label: "automated checks passing on the incidents platform" },
  { value: "3", label: "countries where the telehealth platform I help build runs" },
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
    title: "Clinical-records bot for a legacy insurer portal",
    role: "Sole developer · Automation area at Teker",
    stack: ["Python", "Playwright", "openpyxl", "Tests with fakes"],
    metric: { value: "~2,000", label: "lines of Python driving a frameset portal and a separate AngularJS app" },
    problem:
      "Staff downloaded each patient's clinical record from an insurer portal by hand: search, open, filter by doctor and date, print to PDF, rename, file.",
    approach: [
      "Navigate by URL instead of menus, search every frame, and wait for content instead of network idle.",
      "Pick the doctor's visit closest to the spreadsheet date across all result pages, then check the PDF belongs to the right patient.",
      "Mark every spreadsheet row by color and write a CSV audit log that is the single source of truth.",
    ],
    result:
      "In a typical batch of 28 rows, 17 ended with a verified PDF and the other 11 were flagged as having no record, each with its reason. No row is ever marked done without proof.",
    notes: [
      {
        title: "Hard problems I solved",
        items: [
          "The portal is a frameset with 5 frames, and its entry URL is a launcher that closes itself, so the bot goes straight to the target URLs.",
          "Results load in batches and are paginated; the bot walks every page before deciding which visit is the right one.",
          "Accented names matched 0 of 30 patients until both sides were Unicode-normalized.",
          "A calendar popup covered the results table; the bot now closes it before reading.",
          "Excel turned hexadecimal record codes into numbers, so codes are read and written as text.",
          "An old fallback picked the document type blindly and saved the portal's error screen as a PDF. I removed it: if the bot can't confirm, the row fails with a reason.",
        ],
      },
      {
        title: "Reliability",
        items: [
          "Two timeouts: 30 s for pages that really load, 5 s for elements that may not exist.",
          "Recovers when the browser closes mid-batch and when Excel locks the file while saving.",
          "A stopped run resumes where it left off without repeating finished rows.",
        ],
      },
    ],
  },
  {
    slug: "bulk-lookup",
    title: "Bulk patient lookup without clicking",
    role: "Sole developer · Automation area at Teker",
    stack: ["Python", "Playwright", "requests", "Threads", "pypdf"],
    metric: { value: "5,206 / 5,674", label: "patients found in about 30 minutes" },
    problem:
      "A billing spreadsheet needed birth dates for thousands of patients, and that data only existed inside an insurer's web portal.",
    approach: [
      "Sign in once with Playwright, then call the same JSON endpoints the portal's own screens use, instead of clicking through them.",
      "Read the date from the authorization's PDF preview, not 'Print', because the portal counts every print.",
      "Confirm the ID inside the PDF matches the patient before writing anything back.",
    ],
    result:
      "5,206 patients found in about 30 minutes. Each of the other 468 is logged with the reason it could not be found, so the team knows exactly what to check by hand.",
    notes: [
      {
        title: "Why it is fast and stable",
        items: [
          "One HTTP session per worker thread with keep-alive connections. Opening a new TLS connection per request made the portal hang.",
          "Automatic re-login when the session expires, without losing progress.",
          "A local cache makes the run resumable: restarting skips patients already resolved.",
        ],
      },
      {
        title: "What I would tell a reviewer",
        items: [
          "Using the portal's endpoints is what turned hours of clicking into minutes; the browser is only used to get a valid session.",
          "Reading the preview instead of printing keeps the client's print counters untouched.",
        ],
      },
    ],
  },
  {
    slug: "billing-bundler",
    title: "Billing support-document bundler",
    role: "Sole developer · rewrite of an existing tool",
    stack: ["Python", "Oracle SQL", "pypdf", "44 tests"],
    metric: { value: "176 → 1", label: "documents merged into one 713-page bookmarked PDF" },
    problem:
      "Insurers reject invoices when a supporting document is missing or named wrong, and assembling the bundles by hand took days.",
    approach: [
      "Read the billing spreadsheet, find every document in Oracle and tell the two document types apart by procedure code and source table.",
      "Build one bookmarked PDF and one ZIP per invoice, with the exact file names each insurer requires.",
      "A review mode reports what is missing before anything is downloaded.",
    ],
    result:
      "While rewriting the previous version I found it could attach another patient's record and delete files from earlier runs. Both are fixed and covered by tests.",
    notes: [
      {
        title: "Design decisions",
        items: [
          "Review first, download second: the dry-run mode lets billing staff fix gaps before a bundle is built.",
          "Outputs are never overwritten or deleted; each run writes to its own place.",
          "Every document is matched to the invoice's patient before it goes into the bundle.",
        ],
      },
    ],
  },
  {
    slug: "portal-recon",
    title: "Portal reconnaissance recorder",
    role: "Sole developer · groundwork before automating a portal",
    stack: ["Python", "Playwright", "52 tests"],
    metric: { value: "52", label: "tests on a tool that records a portal before it gets automated" },
    problem:
      "The next portal to automate submits real requests to an insurer. Guessing its fields or flows could create requests nobody intended.",
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
    role: "Main developer · internal tool at Teker",
    stack: ["Next.js", "TypeScript", "Oracle PL/SQL", "JWT", "DBMS_SCHEDULER"],
    metric: { value: "159 / 159", label: "database, API and browser checks passing" },
    problem:
      "The team tracked incidents and development requests outside the app, with no SLA control and no audit trail.",
    approach: [
      "Incidents with SLA deadlines, a timeline per case, email only for moderate or severe ones, and printable traceability reports built without a PDF library.",
      "A requirements tracker that replaced Jira: status rules, a team timeline and planning by area.",
      "All business rules live in PL/SQL packages; the Next.js layer stays thin.",
    ],
    result:
      "67 package tests, 51 API tests and 41 browser tests, all passing. Deployments are idempotent and demo data can be removed without touching real records.",
    notes: [
      {
        title: "The key decision",
        items: [
          "The team rule was not to modify the existing alerts package. Instead of editing it, I connected to it as an observer: a scheduled job reads its logs every 5 minutes.",
          "Trade-off accepted on purpose: up to 5 minutes of delay in exchange for zero risk to a system other teams depend on.",
        ],
      },
      {
        title: "Data integrity",
        items: [
          "The author of every change comes from the signed-in session, never from the request body.",
          "User lists are validated without dynamic SQL.",
          "Work was delivered in small, reviewable blocks, each with its own commit and tests.",
        ],
      },
    ],
  },
  {
    slug: "teker-app",
    title: "TeKer App · telehealth platform",
    role: "Team member · development area at Teker",
    stack: ["Next.js 14", "React 18", "Redux Toolkit", "Tailwind", "Oracle PL/SQL", "Zoom SDK"],
    metric: { value: "3 countries", label: "Colombia, the United States and Mexico" },
    problem:
      "A telehealth company needs one platform for patients, professionals, coordinators, partners and other roles, each with its own permissions.",
    approach: [
      "Next.js App Router with Server Components and Server Actions talking to Oracle through a connection pool.",
      "JWT sessions in cookies and middleware that routes each role to its own area.",
      "Video consultations with the Zoom SDK, translations with next-intl, monitoring with Sentry.",
    ],
    result:
      "I contribute alongside the development team while leading automation and support, so I see both how the product is built and how it fails in daily use.",
    notes: [
      {
        title: "Patterns I work with",
        items: [
          "Server Actions return a consistent { errorCode, errorMsg } shape and revalidate the affected paths.",
          "Oracle CLOB results are converted to JSON at the data layer.",
          "Database access goes through a shared wrapper, so connections are always released.",
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
    org: "Teker · Telehealth · Colombia",
    points: [
      "In charge of process automation and support.",
      "Team member on TeKer App, a multi-role telehealth platform used in Colombia, the US and Mexico (Next.js 14, React 18, Redux Toolkit, Tailwind, Oracle PL/SQL, Zoom SDK).",
      "Built the internal incidents and requirements platform.",
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
    role: "Intern",
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
  { org: "Jala University", detail: "Software engineering studies" },
  { org: "IBM", detail: "Certificate · Generative AI: Prompt Engineering Basics · 2025" },
  { org: "UC Irvine", detail: "Certificate · Problem Solving and Decision Making · 2025" },
];
