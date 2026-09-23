import { isAxiosError } from "axios";

/**
 * Extracts a user-facing message from any thrown value.
 *
 * Understands the backend's error envelope (`{ message }` carried on an
 * Axios response), plain `Error`s (e.g. from `fetch`), and falls back to a
 * generic Persian message so callers never render `undefined`.
 *
 * @param error   the caught value
 * @param fallback message to use when nothing more specific is available
 */
export function getApiErrorMessage(error: unknown, fallback?: string): string {
  const generic = fallback ?? "خطایی رخ داد، لطفا دوباره تلاش کنید";

  if (isAxiosError(error)) {
    return error.response?.data?.message ?? error.message ?? generic;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return generic;
}
