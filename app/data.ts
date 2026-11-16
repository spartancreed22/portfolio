// All site content lives here. Edit this file to update the portfolio.
// Rule: only real work. No client or patient data.

export const profile = {
  name: "Joshua Ortiz",
  role: "Full-Stack Developer · Automation & AI",
  pitch:
    "I automate the work teams still do by hand: Python bots for web portals with no API, document pipelines, and web apps on Next.js and Oracle.",
  location: "Cali, Colombia · UTC-5",
  languages: "Spanish (native) · English (professional)",
  availability: "Open to remote contracts",
  links: {
    linkedin: "https://www.linkedin.com/in/joshua-ort%C3%ADz-a785022b0/",
    upwork: "https://www.upwork.com/freelancers/~0135c14b0c8c4bfe39",
  },
};

export const stats = [
  { value: "5,206", label: "patients looked up in ~30 minutes by one bot" },
  { value: "713", label: "pages merged into a single audited invoice PDF" },
  { value: "150+", label: "automated checks on the incidents platform" },
  { value: "4", label: "roles in the telehealth platform I help build" },
];

export type Project = {
  slug: string;
  title: string;
  stack: string[];
  metric: { value: string; label: string };
  problem: string;
  approach: string[];
  result: string;
};

export const projects: Project[] = [
  {
    slug: "records-bot",
    title: "Clinical-records bot for a legacy insurer portal",
    stack: ["Python", "Playwright", "openpyxl", "Tests with fakes"],
    metric: { value: "5 frames · 2 windows", label: "a frameset portal that opens a separate AngularJS app" },
    problem:
      "Staff downloaded each patient's clinical record from an insurer portal by hand: search, open, filter by doctor and date, print to PDF.",
    approach: [
      "Navigate by URL instead of menus, search every frame, and wait for content instead of network idle.",
      "Pick the doctor's visit closest to the spreadsheet date across all result pages, then check the PDF belongs to the right patient.",
      "Fixed the real failures: accented names (0 of 30 matched until both sides were normalized), a calendar popup hiding the table, and a blind fallback that saved error pages as PDFs.",
    ],
    result: "Each row ends green, orange or yellow with the exact reason in an audit log, and a stopped run resumes where it left off.",
  },
  {
    slug: "bulk-lookup",
    title: "Bulk patient lookup without clicking",
    stack: ["Python", "HTTP", "Threads", "pypdf"],
    metric: { value: "5,206 / 5,674", label: "patients processed in about 30 minutes" },
    problem: "A spreadsheet needed birth dates for thousands of patients that only existed inside an insurer's portal.",
    approach: [
      "Sign in once with Playwright, then call the same JSON endpoints the portal's own screen uses.",
      "Read the date from the authorization's PDF preview (not 'Print', which the portal counts) and confirm the ID matches.",
      "One session per worker and keep-alive connections: a new TLS connection per request made the portal hang.",
    ],
    result: "Automatic re-login, a resumable cache and a clear reason for every patient that could not be found.",
  },
  {
    slug: "billing-bundler",
    title: "Billing support-document bundler",
    stack: ["Python", "Oracle SQL", "pypdf", "44 tests"],
    metric: { value: "176 → 1", label: "documents merged into one 713-page bookmarked PDF" },
    problem: "Insurers reject invoices when a supporting document is missing or named wrong, and assembling them took days.",
    approach: [
      "Read the billing spreadsheet, find every document in Oracle and tell the two document types apart by procedure code.",
      "Build one bookmarked PDF and ZIP per invoice with the exact names each insurer requires.",
      "A review mode reports what is missing before anything is downloaded.",
    ],
    result:
      "While rewriting the previous version I found it could download another patient's record and delete files from earlier runs. Both are fixed and tested.",
  },
  {
    slug: "incidents-platform",
    title: "Incident and requirements platform",
    stack: ["Next.js", "TypeScript", "Oracle PL/SQL", "JWT"],
    metric: { value: "150+", label: "automated checks: database, API and browser" },
    problem:
      "The team tracked incidents and development requests outside the app, with no SLA control and no audit trail.",
    approach: [
      "Incidents with SLA deadlines, timelines, severity-based email and printable traceability reports.",
      "A requirements tracker that replaced Jira: status rules, team timeline and planning by area.",
      "Connected to the existing alerts engine through an observer job instead of editing its code: up to 5 minutes of delay in exchange for full decoupling.",
    ],
    result: "Business rules live in PL/SQL packages; the author of every change comes from the session, never from the request.",
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
    org: "Teker · Telehealth · Ibagué, Colombia",
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
  { group: "Automation", items: ["Playwright", "pandas", "pypdf", "openpyxl", "REST / HTTP"] },
  { group: "Web", items: ["Next.js", "React", "Redux Toolkit", "Tailwind CSS", "Node.js", "Angular"] },
  { group: "Data", items: ["Oracle", "DBMS_SCHEDULER", "Power BI", "Excel"] },
  { group: "Practice", items: ["Git", "Testing with fakes", "AI code review", "Prompt engineering"] },
];

export const education = [
  { org: "SENA", detail: "Technologist in Software Analysis and Development" },
  { org: "Jala University", detail: "Software engineering studies" },
  { org: "IBM", detail: "Generative AI: Prompt Engineering Basics · 2025" },
  { org: "UC Irvine", detail: "Problem Solving and Decision Making · 2025" },
];
