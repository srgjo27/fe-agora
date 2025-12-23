import { Loading } from "@/components/ui";

interface SubmitButtonProps {
  label: string;
  isLoading: boolean;
}

export const SubmitButton = ({ label, isLoading }: SubmitButtonProps) => (
  <button
    type="submit"
    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
    disabled={isLoading}
  >
    {isLoading ? (
      <div className="flex items-center justify-center">
        <Loading size="md" variant="dots" />
      </div>
    ) : (
      label
    )}
  </button>
);
