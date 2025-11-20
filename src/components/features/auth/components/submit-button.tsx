import { Loading } from "@/components/ui";

interface SubmitButtonProps {
  label: string;
  isLoading: boolean;
}

export const SubmitButton = ({ label, isLoading }: SubmitButtonProps) => (
  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-mono font-bold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 border border-blue-400/30"
    disabled={isLoading}
  >
    {isLoading ? (
      <div className="flex items-center justify-center">
        <Loading size="md" variant="dots" />
      </div>
    ) : (
      `$ ${label}`
    )}
  </button>
);
