import { NextRequest } from "next/server";

interface User {
  statusCode: number;
  data: {
    message: string;
    user: {
      _id: string;
      name: string;
      email: string;
      bookmarkedPosts: string[];
      likedPosts: string[];
      avatar: string;
      createdAt: string; // ISO date string
      updatedAt: string; // ISO date string
      __v: number;
      avatarUrl: string;
    };
  };
}

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

    const { data }: { data?: User } = await res.json();
    return data ?? null;
  } catch {
    return null;
  }
}
