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
      "w-full px-4 py-3 bg-white text-sm border rounded-lg resize-y transition-all duration-200",
      "focus:outline-none",
      "hover:border-gray-400",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "placeholder:text-gray-500",
      "leading-relaxed",
      error
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
        : "border-gray-200",
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="flex items-center space-x-2 mb-3 text-sm font-semibold text-gray-800"
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

Textarea.displayName = "Textarea";
