import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/utils";
import { Loading } from "./loading";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
}

export const
  Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        className,
        variant = "primary",
        size = "md",
        loading = false,
        fullWidth = false,
        disabled,
        children,
        ...props
      },
      ref
    ) => {
      const baseClasses =
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 active:scale-95 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
      const variants = {
        primary:
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary:
          "bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-400",
        outline:
          "border border-slate-300 text-slate-700 bg-transparent hover:bg-slate-50 focus:ring-slate-400",
        ghost:
          "text-slate-600 hover:bg-slate-100 focus:ring-slate-400",
        destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      };

      const sizes = {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
      };

      return (
        <button
          className={cn(
            baseClasses,
            variants[variant],
            sizes[size],
            fullWidth && "w-full",
            className
          )}
          ref={ref}
          disabled={disabled || loading}
          {...props}
        >
          {loading && <Loading size="md" variant="spinner" />}
          {children}
        </button>
      );
    }
  );

Button.displayName = "Button";
