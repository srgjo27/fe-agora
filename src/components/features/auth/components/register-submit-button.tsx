import { ButtonLoading } from "@/components/ui";

interface RegisterSubmitButtonProps {
  isLoading: boolean;
}

export const RegisterSubmitButton = ({
  isLoading,
}: RegisterSubmitButtonProps) => (
  <button
    type="submit"
    disabled={isLoading}
    className="w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white py-3 px-4 rounded-lg font-mono font-bold hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5 border border-blue-400/30"
  >
    {isLoading ? (
      <div className="flex items-center justify-center">
        <ButtonLoading />
      </div>
    ) : (
      "$ npm run create"
    )}
  </button>
);
