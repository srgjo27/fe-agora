export const CustomCheckbox = () => (
  <label className="flex items-center cursor-pointer group">
    <div className="relative">
      <input type="checkbox" className="sr-only peer" />
      {/* Custom Checkbox Container */}
      <div className="w-5 h-5 rounded-md border-2 border-gray-600/50 bg-gray-900/50 backdrop-blur-sm transition-all duration-300 peer-checked:border-blue-400 peer-checked:bg-gradient-to-br peer-checked:from-blue-600 peer-checked:to-cyan-500 peer-focus:ring-4 peer-focus:ring-blue-500/20 group-hover:border-blue-500/70 peer-checked:shadow-lg peer-checked:shadow-blue-500/25">
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
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg blur opacity-0 peer-checked:opacity-100 transition-opacity duration-300 -z-10"></div>
        {/* Active Animation Ring */}
        <div className="absolute -inset-2 border border-blue-400/30 rounded-lg opacity-0 peer-checked:opacity-100 animate-pulse"></div>
      </div>
    </div>
    <span className="ml-3 text-sm text-gray-300 font-mono group-hover:text-gray-200 transition-colors duration-200">
      <span className="text-cyan-400">$</span> cache_session --persistent
    </span>
  </label>
);
