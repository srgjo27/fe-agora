"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helpText, disabled, ...props }, ref) => {
    const textareaClasses = cn(
      "w-full px-4 py-3 bg-white text-sm dark:bg-gray-700 border rounded-xl resize-y transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-1",
      "hover:border-gray-400 dark:hover:border-gray-500",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "placeholder:text-gray-500 dark:placeholder:text-gray-400",
      "leading-relaxed",
      error
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
        : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20",
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="flex items-center space-x-2 mb-3 text-sm font-semibold text-gray-800 dark:text-gray-200"
          >
            <span>{label}</span>
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          className={textareaClasses}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
        {helpText && !error && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
