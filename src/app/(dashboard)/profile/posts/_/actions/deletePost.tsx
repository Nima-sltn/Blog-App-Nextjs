"use server";

import { deletePostApi } from "@/services/postServices";
import { StateType } from "@/types/common";
import { getApiErrorMessage } from "@/utils/apiError";
import setCookiesOnReq from "@/utils/setCookieOnReq";
import { revalidatePath } from "next/cache";

interface DeletePostParams {
  postId: string;
  formData?: FormData;
}

/**
 * Server action that deletes a post and revalidates the posts list.
 * Returns `{ message }` on success or `{ error }` on failure for
 * `useActionState`.
 */
export default async function deletePost(
  prevState: StateType,
  { postId }: DeletePostParams,
): Promise<StateType> {
  try {
    const options = await setCookiesOnReq();
    const { message } = await deletePostApi(postId, options);

    revalidatePath("/profile/posts");

    return { message };
  } catch (err: unknown) {
    return { error: getApiErrorMessage(err) };
  }
}
