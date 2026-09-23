# Blog-App-Nextjs

A full-featured Persian (RTL) blog platform built with **Next.js 15 (App Router)** and **React 19** — public blog with search/categories/comments/likes/bookmarks, cookie-based auth with token refresh, and a private dashboard for managing posts.

## Features

- **Public blog** — paginated post list, category pages, full-text search, related posts, comment threads with replies
- **Auth** — signup/signin with httpOnly cookies, silent refresh-token replay via an Axios interceptor, route protection in Edge middleware
- **Dashboard** — stats cards, latest-posts table, create/edit/delete posts (server actions), breadcrumbs
- **Innovation**
  - **Command palette** (`⌘K` / `Ctrl+K`) — keyboard-first navigation with debounced live post search, zero extra dependencies
  - **Optimistic like/bookmark** — instant UI feedback with automatic rollback on API failure
  - **Reading progress bar** — RTL-aware, `requestAnimationFrame`-throttled, exposed as `role="progressbar"`
- **Cross-domain**
  - SEO: dynamic `sitemap.xml`, `robots.txt`, OpenGraph/Twitter metadata, `BlogPosting` JSON-LD
  - Accessibility: skip-to-content link, `:focus-visible` outlines, ARIA labels/current-page states, semantic landmarks
  - Dark mode (class strategy, no flash-of-theme), `loading.tsx` route-level suspense states

## Tech stack

| Layer      | Choice                                          |
| ---------- | ----------------------------------------------- |
| Framework  | Next.js 15 (App Router, Server Components, Server Actions) |
| UI         | React 19, Tailwind CSS 3                        |
| Forms      | react-hook-form + yup                           |
| HTTP       | Axios (interceptors for auth refresh)           |
| Styling    | CSS variables + class strategy dark mode        |
| Testing    | Vitest                                          |
| Lint/Format| ESLint (next/core-web-vitals), Prettier         |

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# then edit NEXT_PUBLIC_BASE_URL to point at your backend API

# 3. Run the dev server
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script                | Purpose                              |
| --------------------- | ------------------------------------ |
| `npm run dev`         | Dev server (Turbopack)               |
| `npm run build`       | Production build                     |
| `npm start`           | Serve the production build           |
| `npm run lint`        | ESLint                               |
| `npm run typecheck`   | `tsc --noEmit`                       |
| `npm test`            | Vitest unit tests (single run)       |
| `npm run test:watch`  | Vitest in watch mode                 |
| `npm run format`      | Prettier write                       |

## Architecture (summary)

```
Browser ─► Next.js middleware (cookie check → /user/profile)
            │
            ▼
Route segments (App Router)
  (blog)     public, SEO-critical, Server Components
  (dashboard) protected, cookie-forwarded Server Components
  (auth)     signin/signup forms (client)
            │
            ▼
src/services  typed API layer (ApiResponse<T> envelope, no `any`)
            │
            ▼
src/services/httpService  Axios instance + 401→refresh→replay interceptor
            │
            ▼
Backend REST API (NEXT_PUBLIC_BASE_URL)
```

Key conventions:

- **The service layer is the only place that talks to the network.** Components never call `fetch`/`axios` directly.
- **Every API response is typed** through the `ApiResponse<T>` envelope in `src/types/api.ts`; `any` is banned by ESLint (`no-explicit-any: error`).
- **Errors cross the network boundary as real errors**: a single `getApiErrorMessage(unknown)` helper turns any thrown value into a user-facing Persian message.
- **Auth cookies are forwarded explicitly** on server-side calls via `setCookiesOnReq()`.
- See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) and [`docs/API.md`](docs/API.md) for the full write-ups.

## Project structure

```
src/
├── app/                  # App Router routes, layouts, loading/error/not-found,
│   │                     # sitemap.ts, robots.ts
│   ├── (blog)/           # public blog + SEO pages
│   ├── (dashboard)/      # protected profile area
│   └── (auth)/           # signin/signup
├── components/           # cross-route client components (Header, CommandPalette,
│                         # ReadingProgress, Pagination, ...)
├── services/             # typed API layer + Axios instance
├── lib/actions.ts        # server actions
├── context/              # AuthContext, DarkModeContext
├── hook/                 # useEscapeKey, useLockBodyScroll, useLocalStorage, ...
├── ui/                   # design-system primitives (Button, Modal, Table, ...)
├── types/                # domain types (common.ts) + API envelope (api.ts)
└── utils/                # pure helpers (tested) + middlewareAuth
```

## Testing

Unit tests live next to the code as `src/**/*.test.ts` and run on Vitest:

```bash
npm test          # single run (also in CI)
npm run test:watch
```

CI (`.github/workflows/ci.yml`) runs **lint + typecheck + tests** on every push and PR to `main`.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

[MIT](LICENSE)
