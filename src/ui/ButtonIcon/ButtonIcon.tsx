"use client";

import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { ButtonVariant } from "./Type";

const btnType: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-100 text-primary-700 hover:bg-primary-900 hover:text-white",
  secondary:
    "bg-secondary-200 text-secondary-500 hover:bg-secondary-500 hover:text-secondary-0",
  outline:
    "border border-secondary-200 text-secondary-500 hover:bg-secondary-200",
  red: "bg-red-100 text-red-500 hover:bg-red-500 hover:text-white",
  danger: "border border-red-100 text-red-500",
};

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: ButtonVariant;
}

const ButtonIcon: FC<ButtonIconProps> = ({
  children,
  onClick,
  className = "",
  variant,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={` ${btnType[variant]} ${className} flex items-center justify-center gap-1 rounded-md p-1 text-xs transition-all duration-300 ease-out lg:text-sm [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-inherit`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
