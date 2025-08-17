import { FC } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import Button from "../Button/Button";
import SubmitButton from "../SubmitButton/SubmitButton";

interface ConfirmDeleteProps {
  resourceName: string;
  onClose: () => void;
  disabled?: boolean;
  onConfirm: (formData?: any) => void | Promise<void>; // matches useFormState signature
}

const ConfirmDelete: FC<ConfirmDeleteProps> = ({
  resourceName,
  onClose,
  disabled = false,
  onConfirm,
}) => {
  return (
    <div>
      <h2 className="mb-8 text-base font-bold text-secondary-700">
        آیا از حذف {resourceName} مطمین هستید؟
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onConfirm();
        }}
      >
        <div className="flex items-center justify-between gap-x-16">
          <Button
            className="flex-1"
            variant="outline"
            onClick={onClose}
            type="button"
          >
            لغو
          </Button>
          <SubmitButton
            type="submit"
            disabled={disabled}
            variant="danger"
            className="flex flex-1 items-center justify-center gap-x-2"
          >
            <TrashIcon className="w-5" />
            <span>حذف</span>
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default ConfirmDelete;
