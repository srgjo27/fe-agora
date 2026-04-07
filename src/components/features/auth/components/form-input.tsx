interface FormInputProps {
  id: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  error?: string;
  disabled?: boolean;
}

export const FormInput = ({
  id,
  type,
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
}: FormInputProps) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-sm font-medium text-slate-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-white text-slate-900 placeholder-slate-400 ${error
        ? "border-red-500 focus:border-red-600 focus:ring-red-100"
        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
        } focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
    />
    {error && (
      <div className="flex items-center mt-1.5 text-red-400 text-sm">
        <svg
          className="w-4 h-4 mr-1 shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        {error}
      </div>
    )}
  </div>
);
