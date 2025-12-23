import Link from "next/link";
import { ROUTES } from "@/constants";

export const FormFooter = () => (
  <>
    {/* Terms */}
    <p className="text-xs text-center text-gray-500 leading-relaxed">
      By signing in, you agree to our{" "}
      <a href="#" className="text-blue-400 hover:text-blue-300 underline">
        Security Policy
      </a>
    </p>

    {/* Register Link */}
    <div className="text-center">
      <p className="text-sm text-gray-400">
        Don't have an account?{" "}
        <Link
          href={ROUTES.AUTH.REGISTER}
          className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          Sign up
        </Link>
      </p>
    </div>
  </>
);
