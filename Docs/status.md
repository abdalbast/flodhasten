# Project Status (Recruiter Demo)

## Current Status

Flodhästen is in a **strong demo / portfolio-ready state** and demonstrates production-minded engineering work, but it is **not yet a fully production-hardened consumer product**.

## What Is Production-Minded Today

- CI pipeline with `lint`, `test`, and `build` gates
- Lint baseline cleaned so CI runs with zero ESLint violations
- Server-side translation credentials (no client-side secret exposure)
- Translation endpoint validation + CORS checks + basic rate limiting
- Error boundary and fallback behavior for speech/TTS features
- Environment variable template (`.env.example`) and local setup guidance
- Documentation of architecture, tradeoffs, and known limitations
- Token-driven UI system rollout with reusable primitives and snapshot checks

## What Still Needs Work Before Full Production Launch

- Improve automated test coverage beyond a smoke test
- Replace fragile free TTS providers with a supported production provider
- Add production error telemetry / monitoring
- Refactor monolithic state orchestration in `src/App.js`

## Why This Still Works Well For Recruiter Demos

This repo is appropriate for AI Engineer / GenAI Engineer interviews because it shows:

- practical API integration discipline
- security-aware frontend/backend boundaries
- resilience and fallback UX thinking
- incremental hardening approach (CI first, then warning/error burn-down)
- clear technical communication in docs

## Suggested Demo Narrative (90–120 seconds)

1. Show the app UI and one learning game.
2. Explain browser speech + TTS fallback design.
3. Show `api/translate.ts` as the secure API boundary.
4. Show `.github/workflows/ci.yml` for quality gates.
5. Call out known limitations and next steps (demonstrates engineering maturity).
