import { User } from "@/types/common";
import { ProfilePayload } from "@/types/api";
import { NextRequest } from "next/server";

/**
 * Verifies the session by forwarding auth cookies to `GET /user/profile`
 * from inside middleware. Returns the inner user object, or `null` when the
 * request is unauthenticated or the backend is unreachable.
 */
export async function middlewareAuth(req: NextRequest): Promise<User | null> {
  const accessToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");

  if (!accessToken || !refreshToken) return null;

  const options: RequestInit = {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: `${accessToken.name}=${accessToken.value}; ${refreshToken.name}=${refreshToken.value}`,
    },
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`,
      options,
    );

    if (!res.ok) return null;

    const body: { data?: ProfilePayload } = await res.json();
    return body.data?.user ?? null;
  } catch {
    return null;
  }
}
