"use client";

import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string;
  error?: string;
  helpText?: string;
  options: SelectOption[];
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helpText,
      options,
      placeholder = "Select an option",
      disabled,
      onChange,
      ...props
    },
    ref
  ) => {
    const selectClasses = cn(
      "w-full h-12 px-4 py-3 text-sm bg-white border rounded-lg appearance-none cursor-pointer transition-all duration-200",
      "focus:outline-none",
      "disabled:cursor-not-allowed disabled:opacity-50",
      error
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
        : "border-gray-200",
      className
    );

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        const syntheticEvent = {
          target: {
            name: e.target.name,
            value: e.target.value,
          },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

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

        <div className="relative">
          <select
            className={selectClasses}
            ref={ref}
            disabled={disabled}
            onChange={handleSelectChange}
            {...props}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom dropdown arrow */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>

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

Select.displayName = "Select";
