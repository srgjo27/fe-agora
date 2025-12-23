export const CustomCheckbox = () => (
  <label className="flex items-center cursor-pointer group">
    <div className="relative">
      <input type="checkbox" className="sr-only peer" />
      {/* Custom Checkbox Container */}
      <div className="w-4 h-4 rounded border border-gray-600 bg-gray-900/50 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500/20 group-hover:border-gray-500">
        {/* Checkmark Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity duration-200">
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
    </div>
    <span className="ml-2 text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-200">
      Remember me
    </span>
  </label>
);
