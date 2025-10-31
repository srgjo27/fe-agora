// Loading component untuk berbagai state
import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
  text?: string;
  className?: string;
}

export const Loading = ({
  size = "md",
  variant = "spinner",
  text,
  className,
}: LoadingProps) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const Spinner = () => (
    <svg
      className={cn("animate-spin", sizes[size])}
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
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const Dots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full bg-current animate-pulse",
            size === "sm" && "w-1 h-1",
            size === "md" && "w-2 h-2",
            size === "lg" && "w-3 h-3"
          )}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  const Pulse = () => (
    <div className={cn("rounded bg-current animate-pulse", sizes[size])} />
  );

  const variants = {
    spinner: <Spinner />,
    dots: <Dots />,
    pulse: <Pulse />,
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="flex flex-col items-center space-y-2">
        {variants[variant]}
        {text && (
          <span className="text-sm text-gray-600 animate-pulse">{text}</span>
        )}
      </div>
    </div>
  );
};

// Page loading component
export const PageLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loading size="lg" text="Loading..." />
  </div>
);

// Button loading component
export const ButtonLoading = () => <Loading size="sm" variant="spinner" />;
