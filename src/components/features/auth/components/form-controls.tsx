import Link from "next/link";
import { CustomCheckbox } from "./custom-checkbox";

export const FormControls = () => (
  <div className="flex items-center justify-between">
    <CustomCheckbox />
    <Link
      href="#"
      className="text-sm text-blue-400 hover:text-blue-300 transition-colors hover:underline"
    >
      Forgot password?
    </Link>
  </div>
);
