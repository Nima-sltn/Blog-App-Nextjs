# Architecture

This document describes how a request flows through Blog-App-Nextjs, the layering rules, and the decisions behind them.

## Layering

```
┌─────────────────────────────────────────────────────────┐
│  Route segments (src/app)                              │
│  Server Components by default; client islands where    │
│  interactivity is needed                               │
├─────────────────────────────────────────────────────────┤
│  Components / UI (src/components, src/ui)              │
│  Presentational + client interaction, no direct I/O    │
├─────────────────────────────────────────────────────────┤
│  Server Actions (src/lib/actions.ts, *_/actions/)      │
│  Mutations with revalidatePath + typed StateType       │
├─────────────────────────────────────────────────────────┤
│  Service layer (src/services)                          │
│  ONLY place that performs network I/O. Fully typed.    │
├─────────────────────────────────────────────────────────┤
│  httpService — Axios instance, cookie auth,            │
│  401 → refresh-token → replay interceptor              │
├─────────────────────────────────────────────────────────┤
│  Backend REST API (NEXT_PUBLIC_BASE_URL)               │
└─────────────────────────────────────────────────────────┘
```

**Rule of thumb:** if a file outside `src/services` contains `fetch(` or an axios import, it is a bug.

## Request flows

### Read (server-rendered page)

1. Middleware (`src/middleware.ts`) guards `/profile`, `/signin`, `/signup` by calling `middlewareAuth` → `GET /user/profile` with forwarded cookies.
2. The page's Server Component calls a service function (`getPosts`, `getAllPostsApi`, …).
3. For personalised data (likes/bookmarks), the page builds cookie-forwarding options via `setCookiesOnReq()` and passes them to the service.
4. The service returns a **typed payload** (`PostListPayload`, …) — components never see response envelopes.

### Write (mutation)

1. A client component invokes a **Server Action** (`useActionState` / direct call).
2. The action forwards cookies, calls the service, then `revalidatePath(...)` so Server Component caches refresh.
3. The action returns a `StateType` (`{ message }` | `{ error }`) — errors are converted with `getApiErrorMessage`, never thrown to the client untyped.

### Auth

```
signin form ─► AuthContext.signin ─► POST /user/signin (httpOnly cookies set)
                                        │
later request 401 ─► axios interceptor ─► GET /user/refresh-token (replay once,
                                        guarded by _retry flag)
```

- Middleware performs the *navigation-level* check (redirect away from /profile when anonymous, away from /signin when authenticated).
- `AuthContext` performs the *UI-level* check (header state, redirect-after-login for comments).

## Rendering strategies

| Route                       | Strategy | Why |
| --------------------------- | -------- | --- |
| `/` `/blogs` `/blogs/category/[slug]` | Dynamic (cookies → personalised flags) | Likes/bookmarks are per-user |
| `/blogs/[slug]`             | On-demand ISR (`revalidate = 300`) | Build stays independent of the live API; newly published posts are served immediately instead of 404-ing, and results are cached for 5 min |
| `/profile/**`               | `force-dynamic` (middleware + cookies) | Protected, personalised content must never be baked at build time |
| `/signin` `/signup`         | Client components | Form interactivity |
| Dashboard cards/table       | Server Components inside `Suspense` | Parallel fetches stream in independently |

## Error handling policy

- `getApiErrorMessage(unknown): string` is the single translation layer from any thrown value to a Persian user-facing message.
- Server actions **never throw** — they return `StateType`.
- Route-level `error.tsx` + `loading.tsx` + `not-found.tsx` exist for every segment group.
- `httpService` guarantees `Promise.reject` always carries an `Error` instance (enforced by `prefer-promise-reject-errors`).

## Typing policy

- `ApiResponse<T>` (src/types/api.ts) models the backend envelope; services unwrap it so callers only see `T`.
- Domain entities live in `src/types/common.ts` (`Post`, `User`, `PostComment`).
- ESLint enforces `@typescript-eslint/no-explicit-any: error` — new `any`s fail CI.

## Accessibility & theming

- Root layout renders a skip-link targeting `#main-content` (each route group's `<main>` carries that id).
- Dark mode uses a `dark-mode`/`light-mode` class on `<html>`, applied before hydration by an inline script (no theme flash), persisted in `localStorage`.
- Focus is always visible (`:focus-visible` outline) even though the base CSS resets `outline`.
