import { FC } from "react";
import { Post } from "../type";
import ButtonIcon from "@/ui/ButtonIcon/ButtonIcon";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { toPersianDigits } from "@/utils/numberFormatter";

interface PostInteractionProps {
  post: Post;
}

const PostInteraction: FC<PostInteractionProps> = ({ post }) => {
  return (
    <div className="flex items-center gap-4">
      <ButtonIcon variant="secondary">
        <ChatBubbleOvalLeftEllipsisIcon />
        <span>{toPersianDigits(post.commentsCount)}</span>
      </ButtonIcon>
      <ButtonIcon variant="red">
        <HeartIcon />
      </ButtonIcon>
      <ButtonIcon variant="primary">
        <BookmarkIcon />
      </ButtonIcon>
    </div>
  );
};

export default PostInteraction;
