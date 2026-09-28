# e81288fe-95dd-4e71-a640-a25dcbbac651 implementation handoff

This archive is the source of truth for turning the design into production code. Start from `index.html`, then preserve the visual system, responsive behavior, and interactions found in the exported files.

## Implementation target
- Build production UI from the exported design, not a loose reinterpretation.
- Preserve typography scale, spacing rhythm, color tokens, border radii, shadows, motion timing, and component states.
- Replace static placeholders only when the target app has real data or functional equivalents.
- Keep generated product UI free of OpenDesign chrome, preview labels, or design-process annotations.
- Treat this handoff as a visual contract: if implementation choices conflict, match the exported pixels and behavior first, then refactor internals.

## Source map
- Primary entry: `index.html`
- HTML screens detected: 1
- Stylesheets detected: 4
- Script/component files detected: 18
- Supporting assets detected: 65

## Responsive contract
Validate the implementation across this 2025–2026 viewport matrix:
- Mobile compact: 360×800
- Mobile standard: 390×844
- Mobile large: 430×932
- Foldable / small tablet: 600×960
- Tablet portrait: 820×1180
- Tablet landscape: 1024×768
- Laptop: 1366×768
- Desktop: 1440×900
- Wide desktop: 1920×1080

For responsive web exports, treat these as a modern breakpoint system for one adaptive web experience, not three fixed screenshots. Do not split responsive web into unrelated native app screens unless the project explicitly includes native targets. Use semantic layout thresholds, fluid `clamp()` type/spacing, and container queries where component width matters more than viewport width. Preserve any CSS media queries, container queries, fluid `clamp()` scales, and layout changes already present in the exported files.

## Design fidelity contract
- Extract reusable tokens before writing components: background, surface, foreground, muted text, border, accent, radius, shadow, spacing, type scale, and motion duration/easing.
- Map product screens, in-app modules/components, optional landing page, and optional OS widget surfaces before coding. Keep these surfaces separate in the target architecture.
- Match layout geometry: max-widths, gutters, grid columns, card proportions, sticky/fixed elements, and viewport-specific navigation.
- Preserve real copy, labels, and data shown in the export. Do not replace specific text with generic marketing filler.
- Preserve interactive affordances: hover, focus, pressed, disabled, loading, validation, copy/share, tab/accordion, modal/sheet, and keyboard states where present.
- Preserve accessibility semantics when converting: headings stay hierarchical, controls remain buttons/links/inputs, focus states stay visible.
- Do not keep prototype-only annotations, frame labels, or OpenDesign chrome in the production UI.

## CJX-ready UX contract
- Use `DESIGN-MANIFEST.json` as the machine-readable map for screens, app modules, OS widgets, landing pages, tokens, interactions, and viewport checks.
- Screen-file-first: when multiple user-facing surfaces exist, implement each HTML screen as its own route/file. Treat `index.html` as a launcher/overview when the manifest marks it that way, not as a combined final UI.
- If `landing.html`, app screens, platform screens, or OS widget files exist, preserve those boundaries in the target app instead of merging them into one page.
- A single self-contained `index.html` is acceptable only when the export truly contains one user-facing screen and its CSS/JS are structured enough to extract tokens, components, states, and behavior.
- If separate `css/` or `js/` files exist, treat them as source of truth for token/component/interactions before porting to React, Vue, SwiftUI, Compose, or another target stack.
- In-app modules/components are product UI blocks inside the app. OS widgets are home-screen/lock-screen/quick-access surfaces outside the app. Do not merge those concepts.

## Color and brand contract
- Use the exported design tokens and product/domain context as the color source of truth.
- Do not introduce warm beige / cream / peach / pink / orange-brown background washes unless they are already explicit brand/reference colors in the export.
- A stylesheet or design/token file was detected; inspect it for canonical color variables before choosing framework theme tokens.

## Implementation sequence for AI coding tools
1. Open `index.html` and `DESIGN-MANIFEST.json`; identify every screen file, launcher/overview file, app module, and interaction before coding.
2. If multiple HTML screens exist, map them to separate routes/surfaces first; do not merge `landing.html`, product app screens, platform screens, or OS widgets into one route.
3. Extract a token table from CSS/root styles and inline styles before building framework components.
4. Build product screens and domain-specific in-app modules from largest layout regions down to controls; avoid starting with isolated atoms that lose spatial intent.
5. Port responsive behavior across the modern viewport matrix and test each semantic breakpoint before cleanup.
6. Port interactions and states, then replace static placeholders only with real app data or functional equivalents.
7. Keep optional landing page and OS widget surfaces as separate surfaces if present.
8. Compare final screenshots against the export at 360×800, 390×844, 430×932, 820×1180, 1024×768, 1366×768, 1440×900, and 1920×1080 before declaring done.

## Entry points
- `index.html`

## Styles
- `_nuxt/entry.C7Ulxg13.css`
- `_nuxt/error-404.jC_aYTLL.css`
- `_nuxt/error-500.DUP75-bG.css`
- `app/assets/css/main.css`

## Scripts/components
- `_nuxt/BbHAqKog.js`
- `_nuxt/Bud3kjHb.js`
- `_nuxt/C7tul0D_.js`
- `_nuxt/D-2JVNG-.js`
- `_nuxt/DEN8x37O.js`
- `_nuxt/DPpLMtSg.js`
- `app/composables/useDemo.ts`
- `app/composables/useLandingSeo.ts`
- `app/data/content.ts`
- `app/types/content.ts`
- `eslint.config.mjs`
- `nuxt.config.ts`
- `playwright.config.ts`
- `scripts/prepare-entry.mjs`
- `server/routes/robots.txt.ts`
- `server/routes/sitemap.xml.ts`
- `shared/utils/site.ts`
- `tests/e2e/landing.spec.ts`

## Assets and supporting files
- `_nuxt/barlow-latin-400-normal.fsAxiSwU.woff`
- `_nuxt/barlow-latin-400-normal.qiz4-Cze.woff2`
- `_nuxt/barlow-latin-500-normal.BPAOfeC8.woff2`
- `_nuxt/barlow-latin-500-normal.C1h8hMer.woff`
- `_nuxt/barlow-latin-600-normal.CNwfPWQD.woff`
- `_nuxt/barlow-latin-600-normal.DILqtrty.woff2`
- `_nuxt/barlow-latin-700-normal.__SGTsZ1.woff`
- `_nuxt/barlow-latin-700-normal.A9pxMQ4z.woff2`
- `_nuxt/builds/latest.json`
- `_nuxt/builds/meta/1161ccbd-21fc-467f-a4d2-55c6ef4536ca.json`
- `_payload.json`
- `01_FLUXO_DE_CLIENTES_Landing_Page_Completa.png`
- `app/app.vue`
- `app/components/cards/FeatureCard.vue`
- `app/components/dashboard/AIAssistantPanel.vue`
- `app/components/dashboard/FunnelBoard.vue`
- `app/components/dashboard/HeroDashboard.vue`
- `app/components/forms/DemoRequestDialog.vue`
- `app/components/hero/HeroSection.vue`
- `app/components/layout/AppFooter.vue`
- `app/components/layout/AppHeader.vue`
- `app/components/layout/BrandLogo.vue`
- `app/components/sections/AISection.vue`
- `app/components/sections/AudienceSection.vue`
- `app/components/sections/BusinessStagesSection.vue`
- `app/components/sections/CustomerFunnelSection.vue`
- `app/components/sections/FAQSection.vue`
- `app/components/sections/FinalCTA.vue`
- `app/components/sections/HowItWorksSection.vue`
- `app/components/ui/AppIcon.vue`
- `app/components/ui/BaseButton.vue`
- `app/components/ui/BaseCard.vue`
- `app/components/ui/BaseDialog.vue`
- `app/components/ui/SectionTitle.vue`
- `app/pages/index.vue`
- `brand/assinatura-horizontal-original.svg`
- `brand/assinatura-horizontal-reverso.svg`
- `brand/simbolo-original.svg`
- `docs/identity.md`
- `favicon.png`
- `icons/icone-app-192.png`
- `icons/icone-app-512.png`
- `images/opengraph-original-1200px.png`
- `licenses/Barlow-OFL.txt`
- `netlify.toml`
- `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `public/brand/assinatura-horizontal-original.svg`
- `public/brand/assinatura-horizontal-reverso.svg`
- `public/brand/simbolo-original.svg`
- `public/favicon.png`
- `public/icons/icone-app-192.png`
- `public/icons/icone-app-512.png`
- `public/images/opengraph-original-1200px.png`
- `public/licenses/Barlow-OFL.txt`
- `README.md`
- `robots.txt`
- `sitemap.xml`
- `tsconfig.json`

## Coding checklist for AI tools
1. Inspect `index.html` and `DESIGN-MANIFEST.json` first and identify reusable components before coding.
2. Implement each user-facing screen file as its own route/surface; keep launcher, landing, app, platform, and OS widget files separate.
3. Extract design tokens into the target stack: colors, type scale, spacing, radius, shadows, and motion.
4. Implement layout with real 2025–2026 responsive breakpoints, fluid type/spacing, and container-query-aware component behavior; test with no horizontal overflow.
5. Preserve interactive controls, hover/focus/pressed states, form behavior, validation, and copy actions where present.
6. Implement domain-specific in-app modules with real states; do not flatten them into generic cards.
7. Keep landing page, product screens, and OS widget/quick-access surfaces separate when present.
8. Confirm the production result visually matches the exported design before refactoring internals.
9. Reject implementation shortcuts that flatten the design into generic cards, generic gradients, placeholder stats, or framework-default typography.
10. If a detail is ambiguous, keep the exported HTML/CSS/JS behavior rather than inventing a new pattern.
