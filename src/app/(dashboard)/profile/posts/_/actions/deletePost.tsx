"use server";

import { deletePostApi } from "@/services/postServices";
import setCookiesOnReq from "@/utils/setCookieOnReq";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface DeletePostParams {
  postId: string;
  formData: FormData;
}

interface DeletePostResponse {
  message?: string;
  error?: string;
}

export default async function deletePost(
  prevState: any,
  { postId }: DeletePostParams,
): Promise<DeletePostResponse> {
  try {
    const options = setCookiesOnReq();
    const { message } = await deletePostApi(postId, options);

    revalidatePath("/profile/posts");

    return { message };
  } catch (err: any) {
    const error = err?.response?.data?.message;
    console.log({ error });
    return { error };
  }
}
