import React from "react";

export interface TextFieldProps {
  type?: string;
  label: string;
  name: string;
  value: string;
  dir?: "rtl" | "ltr";
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isRequired?: boolean;
  className?: string;
}
