export const CustomCheckbox = () => (
  <label className="flex items-center cursor-pointer group">
    <div className="relative">
      <input type="checkbox" className="peer sr-only" />
      <div className="w-5 h-5 rounded border border-slate-300 transition-all duration-200 peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-100 group-hover:border-slate-400">
        <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity duration-200 text-white">
        </div>
      </div>
    </div>
    <span className="ml-2.5 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
      Remember me
    </span>
  </label>
);
