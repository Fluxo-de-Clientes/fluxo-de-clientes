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
- This application is a front-end prototype: no backend, database connection, or persistence layer is implemented in its runtime. An existing Supabase project is identified in `docs/SUPABASE.md`.
- Chat data is intentionally transient; keep messages in session state only, and do not add external API calls unless explicitly requested.
- The product copy is in Portuguese; preserve that language in UI labels and user-facing text.

## Supabase identification

- Before any Supabase task, read `docs/SUPABASE.md` and the `supabase` entry in `INTEGRATIONS.yaml`.
- The verified project ref is `bkhuyaivdvxjqybcglyo` (project `fluxo-de-clientes`, organization `quadrilha_calango`, database `postgres`). Match the project ref when selecting the target; names alone are not unique identifiers.
- These files contain public identification only. Do not add API keys, tokens, database passwords, credentials, or connection strings to them.
- Recording an existing project does not implement an application connection or authorize database changes. Preserve the session-only chat behavior unless the requested task explicitly changes it.
- If the connected project differs from this record, confirm the target before making changes. Update the identification record and its verification date together when an authorized project change occurs.

## Chat feature conventions

- The chat model is defined in `app/types/chat.ts`.
- Shared chat state lives in `app/composables/useVisualChats.ts`.
- New conversations are created through `createChat()`, and route-based chat pages are under `app/pages/chat/[id].vue`.
- Reuse the existing shape of `VisualChat` and `VisualMessage` instead of creating parallel state models.
- When adding interactions, keep behavior deterministic and local to the current session.

## Commands

Run these from the repo root:

- Install dependencies: `npm install`
- Start the dev server: `npm run dev`
- Production build: `npm run build`
- Preview production build: `npm run preview`

## Quality expectations

- Prefer small, focused edits that match the existing style.
- Keep component logic readable and close to the feature it affects.
- If a change introduces new state, place that state in the relevant composable or type file instead of scattering it across components.
- Do not add unnecessary complexity or persistence for a demo app that is explicitly session-based.

## Reference files

- `README.md` — setup and standard Nuxt commands
- `nuxt.config.ts` — app config and Nuxt modules
- `app/composables/useVisualChats.ts` — state and chat helpers
- `app/types/chat.ts` — chat data model
- `app/pages/index.vue` and `app/pages/chat/[id].vue` — page-level patterns
