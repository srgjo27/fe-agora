import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/utils";
import { Loading } from "./loading";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
      "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

    const variants = {
      primary:
        "bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:shadow-lg hover:shadow-blue-500/25 border border-transparent focus:ring-blue-500",
      secondary:
        "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/10 focus:ring-gray-500",
      outline:
        "border border-slate-700 text-slate-200 bg-transparent hover:bg-slate-800 hover:text-white focus:ring-slate-500",
      ghost:
        "text-slate-300 hover:bg-white/10 hover:text-white focus:ring-slate-500",
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
