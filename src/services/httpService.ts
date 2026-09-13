import axios, { AxiosError, AxiosRequestConfig } from "axios";

const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

const toError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    return new Error(error.message);
  }

  return new Error(String(error));
};

app.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(toError(error)),
);

app.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config;

    if (
      error.response?.status === 401 &&
      originalConfig &&
      !("_retry" in originalConfig)
    ) {
      (originalConfig as AxiosRequestConfig & { _retry?: boolean })._retry =
        true;

      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/refresh-token`,
          {
            withCredentials: true,
          },
        );

        if (data) {
          return app(originalConfig);
        }
      } catch (refreshError) {
        return Promise.reject(toError(refreshError));
      }
    }

    return Promise.reject(toError(error));
  },
);

const http = {
  get: app.get,
  patch: app.patch,
  put: app.put,
  delete: app.delete,
  post: app.post,
};

export default http;
