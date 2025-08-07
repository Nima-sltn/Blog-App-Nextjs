"use client";

import React from "react";
import { RHFTextFieldProps } from "./type";

const RHFTextField = <TFormValues extends Record<string, any>>({
  type = "text",
  label,
  name,
  dir = "rtl",
  register,
  errors,
  isRequired,
  validationSchema = {},
  ...rest
}: RHFTextFieldProps<TFormValues>) => {
  const errorMessages = errors?.[name];
  const hasError = !!(errors && errorMessages);

  return (
    <div
      className={`textField relative ${hasError ? "textField--invalid" : ""}`}
    >
      <label htmlFor={name} className="mb-2 block text-secondary-700">
        {label}
      </label>
      <input
        autoComplete="off"
        type={type}
        id={name}
        dir={dir}
        className={`textField__input ${dir === "ltr" ? "text-left" : "text-right"}`}
        {...register(name, validationSchema)}
        {...rest}
      />
      <span className="mt-2 block h-3 text-xs text-red-600">
        {hasError && errorMessages?.message?.toString()}
      </span>
    </div>
  );
};

export default RHFTextField;
