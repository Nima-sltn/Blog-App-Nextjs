"use server";

import { createCommentApi } from "@/services/commentService";
import { StateType, CreateCommentProps } from "@/types/common";
import { getApiErrorMessage } from "@/utils/apiError";
import setCookiesOnReq from "@/utils/setCookieOnReq";
import { revalidatePath } from "next/cache";

/**
 * Server action that creates a comment (or reply) on a post.
 * Returns `{ message }` on success or `{ error }` on failure for use with
 * `useActionState`.
 */
export const createComment = async (
  prevState: StateType,
  { formData, postId, parentId, slug }: CreateCommentProps,
): Promise<StateType> => {
  const options = await setCookiesOnReq();
  const text = formData.get("text");

  if (typeof text !== "string" || !text.trim()) {
    return { error: "متن نظر الزامی است" };
  }

  try {
    const { data } = await createCommentApi(
      { postId, parentId, text },
      options,
    );
    revalidatePath("/blogs");
    // Invalidate the ISR cache of the post itself so the new comment shows
    // up immediately instead of after the next revalidation window.
    if (slug) revalidatePath(`/blogs/${slug}`);
    return { message: data.message };
  } catch (err: unknown) {
    return { error: getApiErrorMessage(err) };
  }
};
