# AGENTS.md

## Project overview

This repository is a Nuxt 4 application for the Fluxo de Clientes web app. It uses Vue 3, TypeScript, `@nuxt/ui`, and the Supabase Nuxt module. Most application source code lives under `app/`.

- Main app entry: `app/pages/`
- Shared UI: `app/components/`
- Reusable logic: `app/composables/`
- State and database contracts: `app/types/`
- Global styling: `app/assets/css/main.css`
- Database migrations and RLS: `supabase/migrations/`
- Server endpoints: `server/api/`

## Core conventions

- Prefer Nuxt patterns (`useState`, `computed`, `ref`, route params) over custom global state management.
- Keep features localized in the `app/` tree unless a change clearly belongs elsewhere.
- Use `@nuxt/ui` primitives before introducing ad-hoc custom UI.
- The app uses Supabase for authentication, organization-scoped contacts, and demo-request registration when its environment variables and migration are configured.
- Never expose `NUXT_SUPABASE_SECRET_KEY` to the client. Use Row Level Security for tenant isolation and authorization.
- Chat data is intentionally transient and separate from operational contact history; do not add external chat or AI API calls unless explicitly requested.
- The product copy is in Portuguese; preserve that language in UI labels and user-facing text.

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
- `app/composables/useCurrentOrganization.ts` — organization selection and membership
- `app/types/database.types.ts` — Supabase database contract
- `shared/schemas/demo-request.ts` — shared server/client demo form validation
- `server/api/demo-requests.post.ts` — server-side commercial request registration
- `supabase/migrations/` — versioned database schema, functions, triggers, and RLS policies
- `app/types/chat.ts` — chat data model
- `app/pages/index.vue` and `app/pages/chat/[id].vue` — page-level patterns
