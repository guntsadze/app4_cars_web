"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  const variantClasses = {
    // Primary ახლა არის სუფთა Dark - თეთრი ღილაკი შავი ტექსტით ან პირიქით
    primary: "bg-gray-100 text-gray-900 hover:bg-white focus:ring-gray-700",
    // Secondary არის მუქი ნაცრისფერი
    secondary:
      "bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700 focus:ring-gray-800",
    // Outline არის მხოლოდ ჩარჩო
    outline:
      "bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white focus:ring-gray-700",
    // Danger რჩება მუქ წითელში
    danger:
      "bg-red-900/30 border border-red-500/50 text-red-400 hover:bg-red-600 hover:text-white",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base font-medium",
    lg: "px-8 py-3 text-lg font-semibold",
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center rounded-lg transition-all duration-200
        focus:outline-none focus:ring-2
        ${fullWidth ? "w-full" : ""}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isDisabled ? "opacity-50 cursor-not-allowed" : "active:scale-[0.98]"}
        ${className}
      `}
      {...rest}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>იტვირთება...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
