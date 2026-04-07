import Link from "next/link";
import { ROUTES } from "@/constants";

export const RegisterFormFooter = () => (
  <>
    {/* Terms */}
    <p className="text-xs text-center text-slate-500 leading-relaxed font-medium">
      By creating an account, you agree to our{" "}
      <a href="#" className="text-blue-600 hover:text-blue-700 underline font-semibold">
        Terms of Service
      </a>{" "}
      and{" "}
      <a href="#" className="text-blue-600 hover:text-blue-700 underline font-semibold">
        Privacy Policy
      </a>
    </p>

    {/* Login Link */}
    <div className="text-center">
      <p className="text-sm text-slate-600 font-medium">
        Already have an account?{" "}
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  </>
);
