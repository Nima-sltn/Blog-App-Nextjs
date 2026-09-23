"use client";
import { FC, useEffect, useState, useTransition } from "react";
import ButtonIcon from "@/ui/ButtonIcon/ButtonIcon";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as SolidHeartIcon,
  BookmarkIcon as SolidBookmarkIcon,
} from "@heroicons/react/24/solid";
import { toPersianDigits } from "@/utils/numberFormatter";
import { bookmarkPostApi, likePostApi } from "@/services/postServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Post } from "@/types/common";
import { getApiErrorMessage } from "@/utils/apiError";

interface PostInteractionProps {
  post: Post;
}

/**
 * Like / bookmark / comment-count controls with optimistic updates:
 * state flips immediately for a snappy feel, then the server response
 * reconciles it (and `router.refresh()` re-syncs the RSC tree). On failure
 * the previous state is rolled back and the API error is toasted.
 */
const PostInteraction: FC<PostInteractionProps> = ({ post }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);

  // Re-sync when the server sends fresh props (e.g. after router.refresh).
  useEffect(() => setIsLiked(post.isLiked), [post.isLiked]);
  useEffect(() => setIsBookmarked(post.isBookmarked), [post.isBookmarked]);

  const likeHandler = async () => {
    const previous = isLiked;
    setIsLiked(!previous); // optimistic
    try {
      const { message } = await likePostApi(post._id);
      toast.success(message);
      startTransition(() => router.refresh());
    } catch (error) {
      setIsLiked(previous); // rollback
      toast.error(getApiErrorMessage(error));
    }
  };

  const bookmarkHandler = async () => {
    const previous = isBookmarked;
    setIsBookmarked(!previous); // optimistic
    try {
      const { message } = await bookmarkPostApi(post._id);
      toast.success(message);
      startTransition(() => router.refresh());
    } catch (error) {
      setIsBookmarked(previous); // rollback
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <div className="flex items-center gap-4">
      <ButtonIcon
        variant="secondary"
        aria-label={`${toPersianDigits(post.commentsCount)} دیدگاه`}
      >
        <ChatBubbleOvalLeftEllipsisIcon />
        <span>{toPersianDigits(post.commentsCount)}</span>
      </ButtonIcon>
      <ButtonIcon
        variant="red"
        aria-label={isLiked ? "حذف لایک" : "لایک کردن"}
        aria-pressed={isLiked}
        disabled={isPending}
        onClick={likeHandler}
      >
        {isLiked ? <SolidHeartIcon /> : <HeartIcon />}
      </ButtonIcon>
      <ButtonIcon
        variant="primary"
        aria-label={isBookmarked ? "حذف نشانک" : "نشانک گذاری"}
        aria-pressed={isBookmarked}
        disabled={isPending}
        onClick={bookmarkHandler}
      >
        {isBookmarked ? <SolidBookmarkIcon /> : <BookmarkIcon />}
      </ButtonIcon>
    </div>
  );
};

export default PostInteraction;
