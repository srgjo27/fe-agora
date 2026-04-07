"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/utils/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      helpText,
      startIcon,
      endIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const [_, setFocused] = useState(false);

    const inputClasses = cn(
      "flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm transition-colors",
      "file:border-0 file:bg-transparent file:text-sm file:font-medium",
      "placeholder:text-muted-foreground",
      "focus:outline-none",
      "disabled:cursor-not-allowed disabled:opacity-50",
      error
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-200",
      startIcon && "pl-10",
      endIcon && "pr-10",
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="flex items-center space-x-2 mb-2 text-sm font-medium text-gray-700"
          >
            <span>{label}</span>
            <span className="text-red-500">*</span>
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {startIcon}
            </div>
          )}
          <input
            type={type}
            className={inputClasses}
            ref={ref}
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {endIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}

        {helpText && !error && (
          <p className="mt-1 text-xs text-gray-500">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
