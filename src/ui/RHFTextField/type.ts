import {
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
  Path,
} from "react-hook-form";

export type RHFTextFieldProps<TFormValues extends Record<string, any>> = {
  type?: React.HTMLInputTypeAttribute;
  label: string;
  name: Path<TFormValues>;
  dir?: "rtl" | "ltr";
  register: UseFormRegister<TFormValues>;
  isRequired?: boolean;
  errors?: Partial<FieldErrors<TFormValues>>;
  validationSchema?: RegisterOptions<TFormValues, Path<TFormValues>>;
} & React.InputHTMLAttributes<HTMLInputElement>;
