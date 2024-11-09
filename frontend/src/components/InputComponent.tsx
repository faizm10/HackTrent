// components/InputComponent.tsx
import React from "react";

interface InputProps {
  label: string;
  id: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const InputComponent: React.FC<InputProps> = ({
  label,
  id,
  value,
  placeholder,
  onChange,
  type = "text",
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 ml-1">
        {label}:
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="caret-indigo-400 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>
  );
};

export default InputComponent;
