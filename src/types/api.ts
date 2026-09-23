import { Post, PostComment, User } from "./common";

/**
 * Envelope every backend response is wrapped in:
 * `{ statusCode, data, message? }`. Axios is typed with this shape in the
 * service layer so call-sites never touch `any`.
 */
export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message?: string;
}

/** POST /user/signup | /user/signin response payload. */
export interface AuthPayload {
  message: string;
  user: User;
}

/** GET /user/profile response payload. */
export interface ProfilePayload {
  message?: string;
  user: User;
}

/** GET /user/list response payload. */
export interface UserListPayload {
  users: User[];
}

/** GET /comment/list response payload. */
export interface CommentListPayload {
  commentsCount: number;
  comments?: PostComment[];
}

/** POST /comment/add response payload. */
export interface CommentPayload {
  message: string;
}

/** GET /post/list response payload. */
export interface PostListPayload {
  posts: Post[];
  totalPages: number;
}

/** GET /post/slug/:slug response payload. */
export interface PostDetailPayload {
  post?: Post;
}

/** POST /post/like | /post/bookmark | /post/remove response payload. */
export interface MessagePayload {
  message: string;
}

/** Credentials accepted by the signup/signin endpoints. */
export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export interface SigninInput {
  email: string;
  password: string;
}

/**
 * Cookie-forwarding options produced by `setCookiesOnReq`. Structurally
 * assignable to both `RequestInit` (fetch) and usable for extracting axios
 * headers, since several services are called from either side.
 */
export interface AuthedRequestOptions {
  method?: string;
  credentials?: RequestCredentials;
  headers?: Record<string, string>;
}
