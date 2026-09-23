import http from "./httpService";
import {
  ApiResponse,
  AuthedRequestOptions,
  MessagePayload,
  PostDetailPayload,
  PostListPayload,
} from "@/types/api";

/**
 * GET /post/slug/:slug — fetch a single post by slug.
 * Uses plain `fetch` (server components) with no cache directives so fresh
 * comment counts are shown. Returns `undefined` for non-OK responses (404s
 * and API hiccups alike) so callers can render the not-found page instead of
 * crashing the route.
 */
export const getPostBySlug = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/slug/${slug}`,
    );
    if (!res.ok) return undefined;
    const body: { data?: PostDetailPayload } = await res.json();
    return body.data?.post;
  } catch {
    return undefined;
  }
};

/**
 * GET /post/list — list posts through axios (cookie-forwarded so
 * `isLiked`/`isBookmarked` flags are personalised).
 */
export async function getAllPostsApi(
  queries: string,
  options?: AuthedRequestOptions,
): Promise<PostListPayload> {
  return http
    .get<ApiResponse<PostListPayload>>(`/post/list?${queries}`, options)
    .then(({ data }) => data.data);
}

/**
 * GET /post/list — list posts through plain `fetch`.
 * Throws a clear `Error` (surfaced by the nearest error boundary) when the
 * API is unreachable or answers with a non-JSON body.
 */
export const getPosts = async (
  queries = "",
  options?: RequestInit,
): Promise<PostListPayload> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/list?${queries}`,
    options,
  );

  let body: { data?: PostListPayload };
  try {
    body = await res.json();
  } catch {
    throw new Error("پاسخ نامعتبر از سرور دریافت شد");
  }

  if (!res.ok) {
    throw new Error(body?.data ? undefined : "خطا در دریافت لیست پست ها");
  }

  return {
    posts: body.data?.posts ?? [],
    totalPages: body.data?.totalPages ?? 0,
  };
};

/** DELETE /post/remove/:id — removes a post (cookie-forwarded). */
export async function deletePostApi(
  id: string,
  options?: AuthedRequestOptions,
): Promise<MessagePayload> {
  return http
    .delete<ApiResponse<MessagePayload>>(`/post/remove/${id}`, options)
    .then(({ data }) => data.data);
}

/** POST /post/like/:id — toggles like on a post. */
export const likePostApi = (postId: string): Promise<MessagePayload> =>
  http
    .post<ApiResponse<MessagePayload>>(`/post/like/${postId}`)
    .then(({ data }) => data.data);

/** POST /post/bookmark/:id — toggles bookmark on a post. */
export const bookmarkPostApi = (postId: string): Promise<MessagePayload> =>
  http
    .post<ApiResponse<MessagePayload>>(`/post/bookmark/${postId}`)
    .then(({ data }) => data.data);
