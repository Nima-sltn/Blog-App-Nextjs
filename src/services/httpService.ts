import axios, { AxiosError } from "axios";

// Extend Axios' internal config type to include our retry flag, so that
// TypeScript recognises `_retry` without any manual type assertions.
declare module "axios" {
  export interface InternalAxiosRequestConfig {
    /** When `true` the request has already been retried after a token refresh. */
    _retry?: boolean;
  }
}

/**
 * Normalizes any value into a real `Error` so that every `Promise.reject`
 * is guaranteed to carry an `Error` instance.
 */
function toError(reason: unknown): Error {
  return reason instanceof Error ? reason : new Error(String(reason));
}

/** Pre-configured Axios instance (sends credentials with every request). */
const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

// ---------------------------------------------------------------------------
// Interceptors
// ---------------------------------------------------------------------------

app.interceptors.request.use(
  (config) => config,
  (error: unknown) => Promise.reject(toError(error)),
);

app.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config;

    // If the server responded with 401 and we have not already retried
    // this request, refresh the session cookie and replay the original
    // request once.
    if (
      error.response?.status === 401 &&
      originalConfig &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;
      try {
        // Use the raw Axios instance so this call does NOT re-enter
        // the interceptor chain.
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/refresh-token`,
          { withCredentials: true },
        );

        if (data) {
          // Retry the original request with the refreshed cookie.
          return app(originalConfig);
        }
      } catch (refreshError) {
        return Promise.reject(toError(refreshError));
      }
    }

    return Promise.reject(toError(error));
  },
);

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

const http = {
  get: app.get,
  patch: app.patch,
  put: app.put,
  delete: app.delete,
  post: app.post,
};

export default http;
