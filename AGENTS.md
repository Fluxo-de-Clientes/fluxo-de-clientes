# AGENTS.md

## Project overview

This repository is a Nuxt 4 application for a client-flow demo. The app uses Vue 3, TypeScript, and `@nuxt/ui` components, with most source code living under `app/`.

- Main app entry: `app/pages/`
- Shared UI: `app/components/`
- Reusable logic: `app/composables/`
- State contracts: `app/types/`
- Global styling: `app/assets/css/main.css`

## Core conventions

- Prefer Nuxt patterns (`useState`, `computed`, `ref`, route params) over custom global state management.
- Keep features localized in the `app/` tree unless a change clearly belongs elsewhere.
- Use `@nuxt/ui` primitives before introducing ad-hoc custom UI.
- This project is a front-end prototype: there is no backend, database, or persistence layer.
- Chat data is intentionally transient; keep messages in session state only, and do not add external API calls unless explicitly requested.
- The product copy is in Portuguese; preserve that language in UI labels and user-facing text.

## Chat feature conventions

- The chat model is defined in `app/types/chat.ts`.
- Shared chat state lives in `app/composables/useVisualChats.ts`.
- New conversations are created through `createChat()`, and route-based chat pages are under `app/pages/chat/[id].vue`.
- Reuse the existing shape of `VisualChat` and `VisualMessage` instead of creating parallel state models.
- When adding interactions, keep behavior deterministic and local to the current session.

## Commands

Run these from the repo root:

- Select Node.js from `.nvmrc` (currently `22.23.1`) before installing. CI and Netlify builds use this file as the runtime source of truth.
- Install the committed dependency tree: `npm ci`. The project enables `engine-strict` so incompatible runtimes fail during installation.
- Start the dev server: `npm run dev`
- Production build: `npm run build`
- Preview production build: `npm run preview`

## Quality expectations

- Prefer small, focused edits that match the existing style.
- Keep component logic readable and close to the feature it affects.
- If a change introduces new state, place that state in the relevant composable or type file instead of scattering it across components.
- Do not add unnecessary complexity or persistence for a demo app that is explicitly session-based.
- Investigate build failures using the failing commit, full log, actual Node/npm versions and lockfile before changing dependencies. See `docs/BUILD-RUNTIME.md` for the historical Node 20 failure and the runtime policy.
- Update `docs/PROJECT-STATUS.md` in the same PR as material product, build, dependency or infrastructure changes. Record evidence and distinguish proposed, reviewed, merged and deployed work; a green CI check does not prove a deployment.
- When updating Node, review `.nvmrc`, `package.json` engines and the lockfile root metadata together, then run a clean install and build. Do not bypass `engine-strict` to hide incompatibilities.

## Reference files

- `README.md` — setup and standard Nuxt commands
- `docs/PROJECT-STATUS.md` — canonical project status, validation evidence and pending work
- `docs/GITHUB-GOVERNANCE.md` — repository governance and status maintenance
- `docs/BUILD-RUNTIME.md` — build incident diagnosis and runtime operations
- `.github/agents/build-error-research.agent.md` — build investigation agent
- `nuxt.config.ts` — app config and Nuxt modules
- `app/composables/useVisualChats.ts` — state and chat helpers
- `app/types/chat.ts` — chat data model
- `app/pages/index.vue` and `app/pages/chat/[id].vue` — page-level patterns
