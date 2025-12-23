import Link from "next/link";
import { ROUTES } from "@/constants";

export const RegisterFormFooter = () => (
  <>
    {/* Terms */}
    <p className="text-xs text-center text-gray-500 leading-relaxed">
      By creating an account, you agree to our{" "}
      <a href="#" className="text-blue-400 hover:text-blue-300 underline">
        Terms of Service
      </a>{" "}
      and{" "}
      <a href="#" className="text-blue-400 hover:text-blue-300 underline">
        Privacy Policy
      </a>
    </p>

    {/* Login Link */}
    <div className="text-center">
      <p className="text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  </>
);
