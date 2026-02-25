# Repository Structure (Recruiter View)

This document is optimized for a fast technical scan. It explains where the important engineering work lives and what can be ignored on a first pass.

## What To Look At First (Recommended Reading Order)

1. `README.md` — product overview, architecture, setup, and tradeoffs
2. `src/App.js` — app orchestration and state management
3. `src/components/WordList.js` — user workflow, translation integration, editing/import UX
4. `src/utils/ttsApi.js` — browser-first TTS + API fallback design
5. `api/translate.ts` — backend validation, CORS, rate limiting, provider call boundary
6. `.github/workflows/ci.yml` — baseline CI quality gates

## Top-Level Directory Guide

### `src/` (Frontend application)
Main product code and UI logic.

- `src/components/` — screens and shared components
- `src/games/` — mini-games used for language practice
- `src/data/` — lesson content, challenge data, analytics mock data
- `src/features/speech/` — speech capability detection and UX support
- `src/lib/` — frontend API clients and helper libraries
- `src/utils/` — runtime utilities (TTS, accessibility, performance, config)
- `src/routes/` — route-level pages (legal/help)

### `api/` (Backend / server-side integrations)
Server code for translation/TTS endpoints and deployment files.

Key files:
- `api/translate.ts` — secure translation endpoint (server-side credentials)
- `api/server.js` — TTS fallback server (Express)

### `public/`
Static assets and PWA resources (icons, video, manifest, offline files).

### `Docs/`
Project documentation for reviewers/recruiters.

## Architecture Notes

### Frontend state model
The app currently centralizes a large amount of state in `src/App.js` for speed of iteration. This is functional and explicit, but is a known refactor candidate for feature-module extraction.

### AI / API boundary
The frontend does **not** hold provider secrets. Translation requests flow through `api/translate.ts`, which performs validation and rate limiting before calling Azure Translator.

### Resilience pattern
Speech and TTS features follow progressive enhancement:
- use browser APIs when available
- fall back to API calls when needed
- avoid blocking the core learning experience

## Recruiter-Facing Strength Signals

- API credentials kept server-side
- CI pipeline included
- Lint/test/build checks documented and runnable
- Known limitations are documented (not hidden)
- Offline/PWA and resilience concerns are considered

## Current Technical Debt (Intentional Transparency)

- `src/App.js` is too large and should be split by feature domain
- Lint warnings remain in several feature/game components
- TTS fallback service dependencies are not yet production-grade
- Test coverage is still minimal (smoke-test baseline + manual validation)

