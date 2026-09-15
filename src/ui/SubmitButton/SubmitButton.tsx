import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { ButtonProps } from "../Button/type";
import Button from "../Button/Button";
import SvgComponent from "../SvgComponent/SvgComponent";

interface SubmitButtonProps extends ButtonProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export default function SubmitButton({
  children,
  className = "",
  ...props
}: Readonly<SubmitButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      disabled={pending}
      className={`flex items-center justify-center gap-x-4 py-4 ${className}`}
    >
      {!pending ? children : <SvgComponent />}
    </Button>
  );
}
