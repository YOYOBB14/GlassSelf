# PROFILER

**PROFILER** is a digital identity analyzer with a dark, surveillance-terminal aesthetic. You feed it social links and browsing traces; it sends them to the Claude API and returns a deeply personal psychological profile. The feeling when you read the report: *"how the hell do they know that about me."*

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML) [![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![Claude API](https://img.shields.io/badge/Claude-API-00c8ff)](https://anthropic.com)

![Screenshot placeholder — run the app and add your own screenshot here.]

## Tech stack

- **Frontend:** Vanilla HTML, CSS, JavaScript (no framework)
- **Backend:** None — API calls go directly to the Anthropic Claude API from the frontend
- **Hosting:** Static site (e.g. GitHub Pages)
- **API:** Anthropic Claude (`claude-sonnet-4-20250514`)

## Run locally

1. Open `index.html` in a browser (or use a local static server, e.g. `npx serve .`).
2. Enter at least one identity vector (LinkedIn, Twitter, GitHub, or personal site) or a behavioral trace URL.
3. For the API to work, you must provide your Anthropic API key:
   - **Option A:** In the browser console, run:  
     `window.ANTHROPIC_API_KEY = 'your-key-here';`  
     Then click ANALYZE.
   - **Option B:** Deploy behind a serverless proxy (Vercel/Netlify function) that adds the `x-api-key` header and forwards requests to `https://api.anthropic.com/v1/messages`. Point the app at your proxy URL instead of calling Anthropic directly.

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. In the repo: **Settings → Pages → Source:** Deploy from branch `main` (or `gh-pages`), folder `/ (root)`.
3. After deploy, open `https://<your-username>.github.io/<repo-name>/`.
4. **API key:** GitHub Pages is static, so the key cannot be stored in the repo. Use a serverless proxy (see above) or set the key in the browser console for personal use.

## API key handling for production

- Do **not** commit your API key or expose it in client-side code.
- For production, use a serverless function (Vercel, Netlify, etc.) that:
  - Accepts POST requests with the prompt payload.
  - Adds `x-api-key` and `anthropic-version` headers from environment variables.
  - Forwards the request to `https://api.anthropic.com/v1/messages` and returns the response.

## Project structure

```
profiler/
├── index.html       ← main app
├── css/style.css    ← all styles
├── js/
│   ├── app.js       ← generate, render, share
│   ├── cursor.js    ← custom crosshair cursor
│   └── ui.js        ← toggles, trace list, clock
├── reference/
│   └── profiler-v3.html  ← original prototype (do not modify)
├── .gitignore
└── README.md
```

## License

ISC
