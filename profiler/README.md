# PROFILER

**PROFILER** is a digital identity analyzer with a dark, surveillance-terminal aesthetic. You feed it social links and browsing traces; it sends them to the Claude API and returns a deeply personal psychological profile. The feeling when you read the report: *"how the hell do they know that about me."*

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML) [![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![Claude API](https://img.shields.io/badge/Claude-API-00c8ff)](https://anthropic.com)

![Screenshot placeholder — run the app and add your own screenshot here.]

## Tech stack

- **Frontend:** Vanilla HTML, CSS, JavaScript (no framework)
- **Backend:** Vercel serverless function (`/api/analyze`) — API key never exposed to the browser
- **Hosting:** Vercel (recommended) or static
- **API:** Anthropic Claude (`claude-sonnet-4-20250514`)

## Deployment (Vercel)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your GitHub repo
3. In **Environment Variables**, add:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** your Anthropic API key (`sk-ant-...`)
4. Click **Deploy**

The API key is never exposed to the browser.

## Local development

Create a `.env.local` file in the project root:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Then run:

```
npx vercel dev
```

Open the URL shown (e.g. `http://localhost:3000`). The app will call `/api/analyze`, which uses the key from `.env.local`.

## Run locally (static only)

1. Open `index.html` in a browser (or use a local static server, e.g. `npx serve .`).
2. Enter at least one identity vector or a behavioral trace URL.
3. **Note:** With static hosting only, the analyze request will fail unless you run `npx vercel dev` or deploy to Vercel.

## Deploy to GitHub Pages

GitHub Pages serves static files only. The `/api/analyze` endpoint will not work there. Use Vercel (see above) for full functionality.

## API key handling

- Do **not** commit your API key. The Vercel function uses `process.env.ANTHROPIC_API_KEY` — set it in the Vercel dashboard.

## Project structure

```
profiler/
├── index.html       ← main app
├── css/style.css    ← all styles
├── js/
│   ├── app.js       ← generate, render, share
│   ├── cursor.js    ← custom crosshair cursor
│   └── ui.js        ← toggles, trace list, clock
├── api/
│   └── analyze.js   ← Vercel serverless function
├── vercel.json      ← Vercel config
├── reference/
│   └── profiler-v3.html  ← original prototype (do not modify)
├── .gitignore
└── README.md
```

## License

ISC
