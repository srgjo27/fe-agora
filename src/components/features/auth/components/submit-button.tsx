import { Loading } from "@/components/ui";

interface SubmitButtonProps {
  label: string;
  isLoading: boolean;
}

export const SubmitButton = ({ label, isLoading }: SubmitButtonProps) => (
  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium"
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
