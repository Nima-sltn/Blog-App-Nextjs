"use server";

import { createCommentApi } from "@/services/commentService";
import { StateType, CreateCommentProps } from "@/types/common";
import setCookiesOnReq from "@/utils/setCookieOnReq";
import { revalidatePath } from "next/cache";

export const createComment = async (
  prevState: StateType,
  { formData, postId, parentId }: CreateCommentProps,
): Promise<StateType> => {
  const options = await setCookiesOnReq();
  const rawFormData = {
    postId,
    parentId,
    text: formData.get("text") as string,
  };
  console.log(rawFormData);

  try {
    const { data } = await createCommentApi(rawFormData, options);
    revalidatePath("/blogs");
    const { message } = data;
    return { message };
  } catch (err: any) {
    const error = err?.response?.data?.message;
    console.log(error);

    return { error };
  }
};
