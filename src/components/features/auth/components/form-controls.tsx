import Link from "next/link";
import { CustomCheckbox } from "./custom-checkbox";

export const FormControls = () => (
  <div className="flex items-center justify-between">
    <CustomCheckbox />
    <Link
      href="#"
      className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-mono hover:underline group"
    >
      <span className="group-hover:text-cyan-300">recover_access?</span>
      <span className="text-gray-500 ml-1">--help</span>
    </Link>
  </div>
);
