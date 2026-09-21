import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { ButtonProps } from "../Button/type";
import Button from "../Button/Button";
import SvgComponent from "../SvgComponent/SvgComponent";

interface SubmitButtonProps extends ButtonProps {
  /** Content displayed when the form is not submitting. */
  readonly children: ReactNode;
  /** Additional class names merged onto the button. */
  readonly className?: string;
}

/**
 * Submit button that shows a spinner while the parent form is being
 * submitted. Automatically disables itself and sets `aria-busy` while
 * the action is in flight.
 */
export default function SubmitButton({
  children,
  className = "",
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      disabled={pending}
      aria-busy={pending || undefined}
      className={`flex items-center justify-center gap-x-4 py-4 ${className}`}
    >
      {!pending ? children : <SvgComponent />}
    </Button>
  );
}
