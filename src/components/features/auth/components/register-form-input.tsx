interface RegisterFormInputProps {
  id: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
}

export const RegisterFormInput = ({
  id,
  type,
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  autoComplete,
}: RegisterFormInputProps) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-semibold text-slate-700 mb-2"
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
      autoComplete={autoComplete}
      className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-white text-slate-900 placeholder-slate-400 font-medium ${
        error
          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
          : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
      } focus:outline-none focus:ring-2 disabled:opacity-50`}
    />
    {error && (
      <div className="flex items-center mt-2 text-red-400 text-xs">
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
