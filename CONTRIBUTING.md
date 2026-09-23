# Contributing to Blog-App-Nextjs

Thanks for helping out! Please read this short guide before opening a PR.

## Getting started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_BASE_URL to your API
npm run dev
```

## Before you push

CI runs these on every PR — run them locally first to save a round-trip:

```bash
npm run lint
npm run typecheck
npm test
```

## Code style

- **TypeScript strictly** — no `any` (ESLint fails the build). Model backend
  payloads in `src/types/api.ts` and domain entities in `src/types/common.ts`.
- **Network I/O only in `src/services`.** Components and actions call service
  functions; they never touch `fetch`/axios.
- **Errors**: catch as `unknown`, convert with `getApiErrorMessage()`.
- **Server actions** return `StateType` (`{ message }` / `{ error }`), they
  don't throw.
- **Server components stay server-side**: no `toast`/`localStorage`/DOM in
  async components (use an error boundary or a client child instead).
- Formatting is Prettier (`npm run format`); Tailwind classes are sorted by
  the plugin automatically.
- UI copy is **Persian (fa)**; keep new user-facing strings in Persian.

## Adding a backend endpoint

1. Define/reuse the payload type in `src/types/api.ts`.
2. Add the service function (unwrap `ApiResponse<T>`).
3. Add a unit test if the mapping is non-trivial (`src/**/*.test.ts`).

## PR checklist

- [ ] `lint`, `typecheck`, `test` all pass locally
- [ ] New logic has tests where practical
- [ ] User-facing strings are Persian
- [ ] No `any`, no `console.log` left behind
- [ ] Docs updated if you changed architecture or the API surface
