import Link from "next/link";
import { ROUTES } from "@/constants";

export const FormFooter = () => (
  <>
    {/* Terms */}
    <p className="text-xs text-center text-slate-500 leading-relaxed">
      By signing in, you agree to our{" "}
      <a href="#" className="text-blue-600 hover:text-blue-500 underline">
        Security Policy
      </a>
    </p>

    {/* Register Link */}
    <div className="text-center">
      <p className="text-sm text-slate-600">
        Don't have an account?{" "}
        <Link
          href={ROUTES.AUTH.REGISTER}
          className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
        >
          Sign up
        </Link>
      </p>
    </div>
  </>
);
