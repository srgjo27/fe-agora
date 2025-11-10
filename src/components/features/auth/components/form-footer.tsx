import Link from "next/link";
import { ROUTES } from "@/constants";

export const FormFooter = () => (
  <>
    {/* Terms */}
    <p className="text-xs text-center text-gray-500 leading-relaxed font-mono">
      Secure authentication via quantum protocols{" "}
      <a href="#" className="text-blue-400 hover:text-blue-300 underline">
        Security_Policy.txt
      </a>
    </p>

    {/* Register Link */}
    <div className="text-center">
      <p className="text-sm text-gray-400 font-mono">
        No account detected?{" "}
        <Link
          href={ROUTES.AUTH.REGISTER}
          className="font-medium text-green-400 hover:text-green-300 transition-colors"
        >
          Initialize_New_User →
        </Link>
      </p>
    </div>
  </>
);
