"use client";

import Button from "@/ui/Button/Button";
import Comment from "./Comment";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { Post, PostComment, PostCommentAnswer } from "@/types/common";
import Modal from "@/ui/Modal/Modal";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import CommentForm from "./CommentForm";

interface BlogCommentsProps {
  post: Post;
}

function BlogComments({ post: { comments, _id: postId } }: BlogCommentsProps) {
  const { user } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [parent, setParent] = useState<PostComment | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const addNewCommentHandler = (parent: PostComment | null) => {
    if (!user) {
      router.push(`/signin?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    setParent(parent);
    setOpen(true);
  };

  return (
    <div className="mb-10">
      <div className="mb-8 flex flex-col items-center justify-between gap-y-3 lg:flex-row">
        <h2 className="text-2xl font-bold text-secondary-800">نظرات</h2>
        <Button
          onClick={() => addNewCommentHandler(null)}
          variant="outline"
          className="flex items-center py-2"
        >
          <QuestionMarkCircleIcon className="ml-2 w-4" />
          <span>ثبت نظر جدید</span>
        </Button>{" "}
        <Modal
          title={parent ? "پاسخ به نظر" : "نظر جدید"}
          description={parent ? parent.user.name : "نظر خود را وارد کنید"}
          open={isOpen}
          onClose={() => setOpen(false)}
        >
          <CommentForm
            postId={postId}
            parentId={parent ? parent._id : null}
            onClose={() => setOpen(false)}
          />
        </Modal>
      </div>

      <div className="post-comments space-y-8 rounded-xl bg-secondary-0 px-3 py-6 lg:px-6">
        {comments.length > 0 ? (
          comments.map((comment: PostComment) => (
            <div key={comment._id}>
              <div className="mb-3 rounded-xl border border-secondary-200 p-2 sm:p-4">
                <Comment
                  comment={comment}
                  onAddComment={() => addNewCommentHandler(comment)}
                />
              </div>

              <div className="post-comments__answer mr-2 space-y-3 sm:mr-8">
                {comment.answers.map(
                  (item: PostCommentAnswer, index: number) => (
                    <div key={item._id} className="relative">
                      <div
                        className={classNames(
                          "answer-item rounded-xl border border-secondary-100 bg-secondary-50/80 p-2 sm:p-4",
                          {
                            "last-item": index + 1 === comment.answers.length,
                          },
                        )}
                      >
                        <Comment comment={item} />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-secondary-500">برای این پست نظری ثبت نشده است</p>
        )}
      </div>
    </div>
  );
}

export default BlogComments;
