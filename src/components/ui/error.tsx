"use client";

import { Button } from "@/components/ui";

interface PageErrorOptions {
  error?: string;
  title?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export const PageError = ({
  error,
  title = "Something went wrong",
  buttonLabel = "Back",
  onButtonClick = () => {},
}: PageErrorOptions) => {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="text-center max-w-md w-full space-y-8">
        {/* Error Icon - Simple & Clean */}
        <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white">{title}</h1>

        {/* Error Message */}
        {error && <p className="text-gray-400 leading-relaxed">{error}</p>}

        {/* Action Button */}
        <Button
          onClick={onButtonClick}
          variant="outline"
          className="px-6 py-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};
