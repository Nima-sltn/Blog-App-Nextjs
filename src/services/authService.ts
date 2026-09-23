import http from "./httpService";
import {
  ApiResponse,
  AuthPayload,
  AuthedRequestOptions,
  ProfilePayload,
  SigninInput,
  SignupInput,
  UserListPayload,
} from "@/types/api";

/** POST /user/signup — creates an account and returns the auth payload. */
export const signupApi = (data: SignupInput): Promise<AuthPayload> =>
  http
    .post<ApiResponse<AuthPayload>>("/user/signup", data)
    .then(({ data: body }) => body.data);

/** POST /user/signin — authenticates and returns message + user. */
export const signinApi = (data: SigninInput): Promise<AuthPayload> =>
  http
    .post<ApiResponse<AuthPayload>>("/user/signin", data)
    .then(({ data: body }) => body.data);

/** GET /user/profile — returns the current user's profile. */
export const getUserApi = (): Promise<ProfilePayload> =>
  http
    .get<ApiResponse<ProfilePayload>>("/user/profile")
    .then(({ data: body }) => body.data);

/** GET /user/list — admin list of all users (cookie-forwarded). */
export const getAllUserApi = (
  options?: AuthedRequestOptions,
): Promise<UserListPayload> =>
  http
    .get<ApiResponse<UserListPayload>>("/user/list", options)
    .then(({ data: body }) => body.data);
