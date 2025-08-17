import setCookiesOnReq from "@/utils/setCookieOnReq";
import { getAllUserApi } from "./authService";
import { getAllCommentApi } from "./commentService";
import { getPosts } from "./postServices";
import toast from "react-hot-toast";

interface CardData {
  numberOfUsers: number;
  numberOfPosts: number;
  numberOfComments: number;
}

export const fetchCardData = async (): Promise<CardData> => {
  const options = await setCookiesOnReq();

  try {
    const data = await Promise.all([
      getAllUserApi(options),
      getAllCommentApi(options),
      getPosts(),
    ]);

    const numberOfUsers = Number(data[0].users.length ?? "0");
    const numberOfComments = Number(data[1].data.commentsCount ?? "0");
    const numberOfPosts = Number(data[2].length ?? "0");

    return {
      numberOfUsers,
      numberOfPosts,
      numberOfComments,
    };
  } catch (error: any) {
    toast.error(error.response.data.message);
    throw error;
  }
};
