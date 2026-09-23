import setCookiesOnReq from "@/utils/setCookieOnReq";
import { getAllUserApi } from "./authService";
import { getAllCommentApi } from "./commentService";
import { getPosts } from "./postServices";
import { getApiErrorMessage } from "@/utils/apiError";

/** Aggregated counters shown on the dashboard cards. */
export interface CardData {
  numberOfUsers: number;
  numberOfPosts: number;
  numberOfComments: number;
}

/**
 * Fetches user/post/comment counters in parallel for the dashboard.
 * Errors are rethrown (never toasted — this runs on the server, where
 * react-hot-toast is a no-op) so the nearest error boundary can render them.
 */
export const fetchCardData = async (): Promise<CardData> => {
  const options = await setCookiesOnReq();

  try {
    const [users, comments, posts] = await Promise.all([
      getAllUserApi(options),
      getAllCommentApi(options),
      getPosts(),
    ]);

    return {
      numberOfUsers: users.users?.length ?? 0,
      numberOfComments: comments.commentsCount ?? 0,
      numberOfPosts: posts.posts.length,
    };
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
};
