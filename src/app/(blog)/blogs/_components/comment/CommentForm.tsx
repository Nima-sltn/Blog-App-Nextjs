"use client";

import { createComment } from "@/lib/actions";
import { CreateCommentProps, StateType } from "@/types/common";
import SubmitButton from "@/ui/SubmitButton/SubmitButton";
import TextArea from "@/ui/TextArea/TextArea";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

interface CommentFormProps {
  postId: string;
  parentId: string | null;
  slug: string;
  onClose: () => void;
}

const initialState: StateType = { error: "", message: "" };

const CommentForm = ({ postId, parentId, slug, onClose }: CommentFormProps) => {
  const [state, formAction] = useActionState<StateType, CreateCommentProps>(
    createComment,
    initialState,
  );

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
      onClose();
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, onClose]);

  return (
    <form
      action={(formData) => formAction({ formData, postId, parentId, slug })}
      className="space-y-7"
    >
      <TextArea name="text" label="متن نظر" isRequired />
      <SubmitButton type="submit" className="w-full">
        تایید
      </SubmitButton>
    </form>
  );
};

export default CommentForm;
