"use client";

import { FC, useActionState, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import ButtonIcon from "@/ui/ButtonIcon/ButtonIcon";
import Modal from "@/ui/Modal/Modal";
import deletePost from "../actions/deletePost";
import { useFormState } from "react-dom";
import ConfirmDelete from "@/ui/ConfirmDelete/ConfirmDelete";

export const CreatePost: FC = () => {
  return (
    <Link
      href="/profile/posts/create"
      className="flex items-center gap-x-4 justify-self-end rounded-lg bg-primary-900 px-4 py-3 text-sm font-medium text-secondary-0 transition-colors hover:bg-primary-700"
    >
      <span className="hidden md:block">ایجاد پست</span>
      <PlusIcon className="w-5" />
    </Link>
  );
};

interface UpdatePostProps {
  id: string;
}

export const UpdatePost: FC<UpdatePostProps> = ({ id }) => {
  return (
    <Link href={`/profile/posts/${id}/edit`}>
      <ButtonIcon variant="outline">
        <PencilIcon />
      </ButtonIcon>
    </Link>
  );
};

interface DeletePostProps {
  id: string;
  postTitle: string;
}

export const DeletePost: FC<DeletePostProps> = ({ id: postId, postTitle }) => {
  const [state, formAction] = useActionState(deletePost, {
    error: "",
    message: "",
  });

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
      setIsDeleteOpen(false);
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <>
      <ButtonIcon variant="outline" onClick={() => setIsDeleteOpen(true)}>
        <TrashIcon className="text-error" />
      </ButtonIcon>
      <Modal
        title={`حذف ${postTitle}`}
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
      >
        <ConfirmDelete
          resourceName={postTitle}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={async (formData) => {
            await formAction({ formData, postId });
          }}
        />
      </Modal>
    </>
  );
};
