import { PostComment, PostCommentAnswer } from "@/types/common";
import Avatar from "@/ui/Avatar/Avatar";
import Button from "@/ui/Button/Button";
import { ArrowUturnRightIcon } from "@heroicons/react/24/outline";

interface CommentProps {
  comment: PostComment | PostCommentAnswer;
  onAddComment?: () => void;
}

function Comment({ comment, onAddComment }: CommentProps) {
  return (
    <>
      <div className="mb-5 flex items-center justify-between border-b border-b-secondary-200/60 pb-2">
        <div className="flex items-center">
          <Avatar height={34} width={34} src={comment.user.avatarUrl} />
          <div className="w-full text-sm text-secondary-600">
            <span className="mb-1 block font-bold">{comment.user.name}</span>
            <span className="block text-xs text-secondary-500">
              {comment.createdAt}
            </span>
          </div>
        </div>
        <div>
          {comment.openToComment && (
            <Button
              onClick={onAddComment}
              variant="secondary"
              className="flex h-fit gap-x-1 rounded-lg bg-secondary-200 p-1 text-sm text-secondary-500"
            >
              <span className="ml-1">
                <ArrowUturnRightIcon className="w-4" />
              </span>
              <span>پاسخ</span>
            </Button>
          )}
        </div>
      </div>
      <p className="text-xs leading-loose text-secondary-700 lg:text-base lg:leading-8">
        {comment.content.text}
      </p>
    </>
  );
}

export default Comment;
