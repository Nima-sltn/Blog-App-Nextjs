"use client";

import SubmitButton from "@/ui/SubmitButton/SubmitButton";
import TextArea from "@/ui/TextArea/TextArea";
import { useState } from "react";

interface CommentFormProps {
  postId: string;
  parentId: string | null;
  onClose: () => void;
}

const CommentForm = ({ postId, parentId, onClose }: CommentFormProps) => {
  const [text, setText] = useState("");
  return (
    <div>
      <div className="mt-4 flex justify-center">
        <div className="w-full max-w-md">
          <form className="space-y-7">
            <TextArea
              name="text"
              label="متن نظر"
              value={text}
              isRequired
              onChange={(e) => setText(e.target.value)}
            />
            <div className="mt-8">
              <SubmitButton type="submit" className="w-full">
                تایید
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CommentForm;
