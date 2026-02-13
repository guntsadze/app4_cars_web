"use client";

import { InputHTMLAttributes, ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";

export interface InputProps<T extends FieldValues> extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name"
> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: "default" | "outlined" | "filled";
  inputSize?: "sm" | "md" | "lg";
}

export default function Input<T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  fullWidth = true,
  leftIcon,
  rightIcon,
  variant = "default",
  inputSize = "md",
  className = "",
  type = "text",
  disabled,
  required,
  ...rest
}: InputProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const inputId = rest.id || `input-${name}`;

  // მუქი თემის ზომები
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  // მუქი თემის ვარიანტები
  const variantClasses = {
    default:
      "border border-gray-700 bg-gray-800 text-white placeholder-gray-500",
    outlined:
      "border-2 border-gray-700 bg-transparent text-white placeholder-gray-500",
    filled: "border-0 bg-gray-800 text-white placeholder-gray-500",
  };

  return (
    <div className={`${fullWidth ? "w-full" : ""}`}>
      {/* Label - მუქი ფონისთვის */}
      {label && (
        <label
          htmlFor={inputId}
          className={`
            block text-sm font-medium mb-1.5
            ${disabled ? "text-gray-600" : "text-gray-300"}
          `}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {leftIcon}
          </div>
        )}

        {/* Input Field - Dark Mode Styles */}
        <input
          {...field}
          id={inputId}
          type={type}
          disabled={disabled}
          className={`
            w-full rounded-lg outline-none transition-all
            ${sizeClasses[inputSize]}
            ${variantClasses[variant]}
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            ${
              error
                ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50 bg-red-500/5"
                : "focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500"
            }
            ${disabled ? "bg-gray-900 cursor-not-allowed opacity-50 border-gray-800" : ""}
            ${className}
          `}
          {...rest}
        />

        {/* Right Icon */}
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1.5 text-sm text-red-400 flex items-start gap-1">
          <svg
            className="w-4 h-4 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error.message}</span>
        </p>
      )}

      {/* Helper Text */}
      {!error && helperText && (
        <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
