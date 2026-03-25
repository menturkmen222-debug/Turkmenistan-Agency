# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains the Ýeňil premium web agency website.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite, Tailwind CSS, Framer Motion

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server (chat, contact, analytics routes)
│   ├── mockup-sandbox/     # Component preview sandbox
│   └── yenil/              # Ýeňil web agency React + Vite frontend
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Ýeňil Website

**Business:** Premium web development agency targeting Turkmenistan market
**URL:** `/` (root preview path)

### Features
- Full-page single-page website with 9 sections
- 5-language support (Turkmen, Turkish, Uzbek, Russian, English) via custom i18n context
- Dark green/gold premium design with Playfair Display + DM Sans + Space Grotesk fonts
- AI chat widget powered by Groq (llama-3.3-70b-versatile)
- Contact form with Telegram bot notifications to 2 admins
- Analytics event tracking via Telegram (batched, 10s intervals for non-critical events)
- Framer Motion animations throughout
- Custom cursor on desktop
- Mobile-first responsive design
- Count-up stats animation on scroll

### Sections
1. Header (sticky glassmorphism, language switcher, mobile hamburger)
2. Hero (full-viewport, animated 3D background, CTAs)
3. Pain Points (6 psychological trigger cards)
4. Services (6 service cards in 2x3 grid)
5. Stats (animated counters + Why Us columns)
6. Showcase (testimonials + tech stack floating badges)
7. Pricing (3-tier cards with USD/TMT pricing)
8. Contact Form (comprehensive with package/design style selectors)
9. Footer (links, social, contact info)

### API Routes
- `POST /api/chat` — Groq AI chat (rate-limited 20 req/min/IP)
- `POST /api/contact` — Contact form → Telegram Bot notification
- `POST /api/analytics` — Analytics events → Telegram (batched)

### Environment Variables Required
- `GROQ_API_KEY` — For AI chat (console.groq.com)
- `TELEGRAM_BOT_TOKEN` — Telegram bot token
- `TELEGRAM_USER_ID_1` — First admin Telegram user ID
- `TELEGRAM_USER_ID_2` — Second admin Telegram user ID

## Packages

### `artifacts/api-server` (`@workspace/api-server`)
Express 5 API server with chat, contact, analytics, and health routes.
- `pnpm --filter @workspace/api-server run dev`

### `artifacts/yenil` (`@workspace/yenil`)
React + Vite frontend for the Ýeňil agency website.
- `pnpm --filter @workspace/yenil run dev`
- Key packages: framer-motion, react-hook-form, zod, canvas-confetti, @hookform/resolvers

### `lib/api-spec` (`@workspace/api-spec`)
OpenAPI spec with endpoints: /healthz, /chat, /contact, /analytics
- `pnpm --filter @workspace/api-spec run codegen`
