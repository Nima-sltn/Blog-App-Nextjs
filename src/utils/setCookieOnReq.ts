import { cookies } from "next/headers";
import { AuthedRequestOptions } from "@/types/api";

/**
 * Builds request options that forward the auth cookies to the backend API.
 * The returned object is assignable to both `fetch`'s `RequestInit` and the
 * axios-based services' `AuthedRequestOptions`.
 */
export default async function setCookiesOnReq(): Promise<AuthedRequestOptions> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");

  return {
    method: "GET",
    credentials: "include",
    headers:
      accessToken && refreshToken
        ? {
            Cookie: `${accessToken.name}=${accessToken.value}; ${refreshToken.name}=${refreshToken.value}`,
          }
        : {},
  };
}
