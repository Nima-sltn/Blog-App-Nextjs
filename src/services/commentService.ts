import http from "./httpService";
import {
  ApiResponse,
  AuthedRequestOptions,
  CommentListPayload,
  CommentPayload,
} from "@/types/api";

export interface CreateCommentInput {
  postId: string;
  parentId: string | null;
  text: string;
}

/** POST /comment/add — creates a comment (or reply) on a post. */
export const createCommentApi = (
  data: CreateCommentInput,
  options?: AuthedRequestOptions,
): Promise<{ data: CommentPayload }> =>
  http
    .post<ApiResponse<CommentPayload>>("/comment/add", data, options)
    .then(({ data: body }) => ({ data: body.data }));

/** GET /comment/list — all comments with total count (cookie-forwarded). */
export const getAllCommentApi = (
  options?: AuthedRequestOptions,
): Promise<CommentListPayload> =>
  http
    .get<ApiResponse<CommentListPayload>>("/comment/list", options)
    .then(({ data: body }) => body.data);
