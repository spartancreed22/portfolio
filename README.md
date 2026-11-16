# Joshua Ortiz · Portfolio

Next.js 15 + React 19 + TypeScript. Plain CSS, no extra dependencies.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # check it compiles before deploying
```

## Edit content

Everything you see on the site lives in `app/data.ts`. Change text there, nothing else.

## Add your photo

Save it as `public/joshua.jpg` (also accepts .jpeg, .png or .webp). A vertical photo works best (4:5, at least 800×1000 px). Until then the frame shows your initials.

## Add your CV

Save your CV as `public/Joshua-Ortiz-CV.pdf`. A "Download CV" button appears automatically on the next build.

## Deploy to Vercel

Option A, from the terminal:

```bash
npx vercel login
npx vercel          # preview; accept the defaults
npx vercel --prod   # production URL
```

Option B, from GitHub:

1. Create an empty repo on GitHub (e.g. `portfolio`).
2. `git init && git add . && git commit -m "Portfolio" && git branch -M main`
3. `git remote add origin https://github.com/<your-user>/portfolio.git && git push -u origin main`
4. On vercel.com: Add New → Project → import the repo → Deploy. Every push redeploys.
