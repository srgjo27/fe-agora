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
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-mono font-medium text-blue-400 mb-2"
    >
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
      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-gray-900/50 backdrop-blur-sm text-white font-mono placeholder-gray-500 ${
        error
          ? "border-red-500/50 focus:border-red-400 focus:ring-red-500/20"
          : "border-gray-600/50 focus:border-blue-400 focus:ring-blue-500/20"
      } focus:outline-none focus:ring-4 disabled:opacity-50`}
    />
    {error && (
      <div className="flex items-center mt-2 text-red-400 text-xs font-mono">
        <svg
          className="w-4 h-4 mr-1 flex-shrink-0"
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
