# Flodhästen

A production-minded Swedish language learning app built with React, with gamified lessons, speech features, and API-backed translation/TTS integrations.

This repository is positioned as an AI/GenAI engineering portfolio project: it demonstrates practical AI feature integration, frontend product engineering, API hardening, CI setup, and recruiter-friendly documentation.

## Why This Project

Language-learning products often fail on engagement and feedback loops. Flodhästen focuses on:

- interactive practice modes instead of static vocab lists
- speech and pronunciation-related UX for Swedish learning
- offline/PWA support and resilient fallbacks
- production-minded engineering patterns (API boundaries, validation, CI, error handling)

## Demo Highlights (2-minute scan)

- Multi-mode learning experience (flashcards, matching, spelling, word games, platformer-style game)
- Swedish pronunciation and speech capability detection with fallbacks
- Translation API integration with server-side validation and rate limiting
- PWA/offline support and service worker setup
- CI workflow (`lint` / `test` / `build`)
- Recruiter-ready docs and setup guidance

## Features

### Learning Product Features
- Lesson progression and vocabulary practice
- Multiple mini-games (`src/games/`)
- Daily challenges and achievements
- Multi-language UI (including Kurdish variants)
- Dark mode and responsive UI
- Custom word import and editing

### Engineering Features
- API-backed translation endpoint (`api/translate.ts`) with request validation + CORS + rate limiting
- TTS client with browser-first playback and API fallback (`src/utils/ttsApi.js`)
- Error boundary and resilience patterns (`src/components/ErrorBoundary.js`)
- CI on GitHub Actions (`.github/workflows/ci.yml`)
- Build/test/lint scripts for local and CI usage

## AI-Specific Components

This project is not a large-LLM orchestration app (no RAG/embeddings/tool-calling pipeline yet). It is still relevant for AI/GenAI roles because it demonstrates integration discipline around AI-adjacent services and inference APIs.

### Current AI / ML-adjacent integrations
- **Translation API** (Azure Translator via server endpoint)
  - Frontend calls `POST /api/translate`
  - Server injects provider credentials from env vars
  - Input validation, CORS checks, and simple rate limiting are enforced server-side
- **Speech / Pronunciation UX**
  - Browser speech recognition capability detection and fallback UI (`src/features/speech/useSpeechSupport.js`)
  - Browser TTS primary path with external TTS API fallback (`src/utils/ttsApi.js`)

### Why this matters for recruiters
- Shows awareness of **secrets management** (no client-side secret signing pattern)
- Shows **API boundary design** between frontend and provider credentials
- Shows **degraded-mode UX** when speech features are unavailable
- Shows **reliability thinking** (validation, fallback behavior, CI checks)

### Future AI extensions (not yet implemented)
- LLM conversation tutor (structured prompts + guardrails)
- Pronunciation feedback model/evaluation loop
- Retrieval for grammar explanations and examples
- Evaluation harness for translation/speech UX quality regressions

## Architecture

### High-level flow
1. React app renders lessons, games, and progress UI.
2. Client uses browser APIs for speech when available.
3. Client calls backend endpoints for translation/TTS fallback features.
4. Backend proxies provider calls using server-side env credentials.
5. PWA/service worker supports offline behavior and caching.

### Repository structure

```text
.
├── api/                    # Backend/API handlers and standalone TTS server assets
│   ├── translate.ts        # Vercel-style translation endpoint (validated + rate limited)
│   ├── server.js           # Express TTS API (fallback service)
│   └── README.md
├── public/                 # Static assets (video, images, manifest, icons)
├── src/
│   ├── components/         # UI screens and reusable React components
│   ├── games/              # Mini-game implementations
│   ├── data/               # Lesson content and game data
│   ├── features/speech/    # Speech capability detection hooks
│   ├── lib/                # Client-side helpers (translation client, crypto helpers)
│   ├── routes/             # Route-level screens (legal/help)
│   └── utils/              # Runtime helpers (TTS, config, accessibility, performance)
├── Docs/                   # Recruiter-facing docs / architecture / status notes
├── scripts/                # Utility scripts used by npm workflows
├── .github/workflows/      # CI pipeline
└── package.json
```

See `Docs/Structure.md` for a recruiter-friendly breakdown and `Docs/status.md` for current readiness notes.

## Stack

- **Frontend**: React 18, React Scripts (CRA), Framer Motion
- **Styling**: CSS, Tailwind utility usage, component-level styles
- **Testing**: React Testing Library + Jest
- **Backend/API**: Vercel serverless handler (`api/translate.ts`), Express TTS server (`api/server.js`)
- **Infra/Deploy**: GitHub Pages (static), Vercel (API/prod path), GitHub Actions CI
- **Web APIs**: SpeechRecognition / SpeechSynthesis, Service Worker, localStorage

## Quick Start (Recruiter-Friendly)

### Prerequisites
- Node.js 18+ (20 recommended)
- npm 8+

### 1. Install

```bash
npm install
```

### 2. Start the app

```bash
npm start
```

Open `http://localhost:3000`.

### 3. Optional: Enable translation locally

Translation features require a backend endpoint and Azure Translator credentials.

```bash
cp .env.example .env
```

Set at minimum:
- `AZURE_TRANSLATION_KEY`
- `AZURE_TRANSLATION_REGION`

If your frontend is running separately from the API, optionally set:
- `REACT_APP_TRANSLATE_API_URL`
- `REACT_APP_TTS_API_URL`

## Local Validation Commands

```bash
npm run lint
npm run test:ci
npm run build
```

## Usage Notes

- Many features work without API credentials (core UI, local gameplay, progress tracking).
- Translation/TTS fallback features degrade gracefully when endpoints or keys are unavailable.
- Browser speech support varies by browser/device.

## Screenshots (Placeholders)

Add screenshots to `Docs/screenshots/` and update these references before sharing widely.

- `Docs/screenshots/home.png` (home / lesson dashboard)
- `Docs/screenshots/gameplay.png` (one mini-game in action)
- `Docs/screenshots/wordlist.png` (word list + translation workflow)
- `Docs/screenshots/mobile.png` (mobile responsive view)

## Engineering Decisions & Tradeoffs

### 1. Frontend-first product with selective backend APIs
- **Decision**: Keep most app behavior client-side for fast iteration and easier demos.
- **Tradeoff**: More complex local state and localStorage logic in `App.js`.
- **Benefit**: Recruiters can run the product quickly without a full backend stack.

### 2. Browser TTS first, API fallback second
- **Decision**: Prefer browser-native speech synthesis where available.
- **Tradeoff**: Voice consistency differs by platform/browser.
- **Benefit**: Lower latency and reduced dependency on external APIs.

### 3. Server-side translation credentials
- **Decision**: Move secrets to server boundary; client no longer signs with a bundled secret.
- **Tradeoff**: Requires backend endpoint and deployment env configuration.
- **Benefit**: Correct security posture and cleaner API ownership.

### 4. CI introduced before strict warning cleanup
- **Decision**: Add CI now and get to zero errors first, then reduce warning debt iteratively.
- **Tradeoff**: Warnings still exist.
- **Benefit**: Immediate quality gate without blocking progress.

## Reliability, Testing, and Known Limitations

### Reliability / Quality Controls
- CI runs lint, tests, and production build on push/PR
- Translation endpoint validates payloads, language pairs, origin, and basic rate limits
- Error boundary exists for safer UI failure handling
- Smoke test verifies app render path in CI

### Current Testing State
- Unit/integration coverage is limited (currently a smoke test baseline plus framework setup)
- Main confidence comes from lint + build + manual feature testing

### Known Limitations
- Remaining lint warnings (~100+) should be reduced before production launch
- TTS backend relies on third-party/free endpoints and may be brittle
- App state orchestration is concentrated in `src/App.js` (monolithic state management)
- Browser speech APIs are inconsistent across browsers/devices
- Error telemetry is not yet connected to a production monitoring service

## Future Improvements

### Product / AI
- Add LLM-based tutor mode with prompt templates and guardrails
- Add lesson recommendation logic and personalization
- Add pronunciation scoring/eval framework and regression checks

### Engineering
- Split `App.js` into feature slices / reducers / context modules
- Introduce stricter lint gates and warning budget
- Add integration tests for translation/TTS flows
- Add observability (Sentry/OpenTelemetry-style monitoring)
- Replace fragile TTS fallback providers with a supported production provider

## Repository Hygiene Notes (for Recruiters)

This repo is intentionally prepared to demonstrate professional engineering habits:
- generated `build/` artifacts are not tracked
- CI is configured for reproducible checks
- environment variables are documented via `.env.example`
- documentation explains architecture, tradeoffs, and limitations (not just features)

## Additional Docs

- `Docs/Structure.md` — recruiter-friendly structure walkthrough
- `Docs/status.md` — current project status and production-readiness notes

