import { cookies } from "next/headers";

export default async function setCookiesOnReq(): Promise<RequestInit> {
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
