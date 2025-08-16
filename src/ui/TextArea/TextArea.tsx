import { ChangeEvent } from "react";

interface TextAreaProps {
  label: string;
  name: string;
  value?: string;
  dir?: "ltr" | "rtl";
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isRequired?: boolean;
}

function TextArea({
  label,
  name,
  value,
  dir = "rtl",
  onChange,
  isRequired = false,
}: TextAreaProps) {
  return (
    <div className="textField">
      <label htmlFor={name} className="text-sm text-secondary-600">
        {label}
        {isRequired && <span className="text-error">*</span>}
      </label>
      <textarea
        name={name}
        id={name}
        dir={dir}
        className={`textField__input mt-2 min-h-[150px] leading-8 ${
          dir === "ltr" ? "text-left" : "text-right"
        }`}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
}

export default TextArea;
