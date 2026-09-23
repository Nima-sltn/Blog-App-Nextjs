# Backend API contract

All endpoints are relative to `NEXT_PUBLIC_BASE_URL`. Types below are the TS
definitions in `src/types/api.ts` — keep them in sync when the backend grows.

## Response envelope

```ts
interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message?: string;
}
```

The service layer unwraps `.data` — components only ever see `T`.

## Error shape

```json
{ "statusCode": 400, "message": "کاربر یافت نشد" }
```

`getApiErrorMessage()` reads `error.response.data.message` (axios) and falls
back to `error.message`, then a generic Persian message.

## Authentication

- Signin/signup set **httpOnly cookies** (`accessToken`, `refreshToken`).
- Server-side calls must forward them: `const options = await setCookiesOnReq()`.
- On `401`, the Axios interceptor calls `GET /user/refresh-token` **once**
  (`_retry` flag prevents loops) and replays the original request.

## Endpoints

| Method | Path                | Used by                          | Payload (`data`)          |
| ------ | ------------------- | -------------------------------- | ------------------------- |
| POST    | `/user/signup`     | `AuthContext.signup`             | `AuthPayload`             |
| POST    | `/user/signin`     | `AuthContext.signin`             | `AuthPayload`             |
| GET     | `/user/profile`    | `AuthContext.getUser`, middleware | `ProfilePayload`         |
| GET     | `/user/list`       | dashboard cards                  | `UserListPayload`         |
| GET     | `/post/list?…`     | blog list, search, category, table | `PostListPayload`       |
| GET     | `/post/slug/:slug` | post page (`generateMetadata` too) | `PostDetailPayload`     |
| POST    | `/post/like/:id`   | optimistic like toggle           | `MessagePayload`          |
| POST    | `/post/bookmark/:id` | optimistic bookmark toggle     | `MessagePayload`          |
| DELETE  | `/post/remove/:id` | delete server action             | `MessagePayload`          |
| POST    | `/comment/add`     | comment server action            | `CommentPayload`          |
| GET     | `/comment/list`    | dashboard cards                  | `CommentListPayload`      |
| GET     | `/category/list`   | category sidebar (`force-cache`) | `{ categories: Category[] }` |
| GET     | `/user/refresh-token` | axios interceptor (raw, cookie credentials) | —    |

### Query parameters used on `/post/list`

| Param         | Example               | Where                          |
| ------------- | --------------------- | ------------------------------ |
| `search`      | `search=nextjs`       | blog list `Search`, command palette |
| `page`        | `page=2`              | pagination (`Search` resets to 1) |
| `categorySlug`| `categorySlug=react`  | category page                  |
| `sort`        | `sort=latest`         | dashboard latest posts         |
| `limit`       | `limit=5`             | dashboard, command palette     |

## Conventions for new endpoints

1. Add the payload type to `src/types/api.ts`.
2. Add a function to the right file in `src/services/` that unwraps `ApiResponse<T>`.
3. Never call `fetch`/`axios` from components or actions directly.
