import Link from "next/link";
import { ROUTES } from "@/constants";

export const RegisterFormFooter = () => (
  <>
    {/* Terms */}
    <p className="text-xs text-center text-gray-500 leading-relaxed font-mono">
      By executing this protocol, you agree to our{" "}
      <a href="#" className="text-green-400 hover:text-green-300 underline">
        Terms_of_Service.txt
      </a>{" "}
      and{" "}
      <a href="#" className="text-green-400 hover:text-green-300 underline">
        Privacy_Policy.md
      </a>
    </p>

    {/* Login Link */}
    <div className="text-center">
      <p className="text-sm text-gray-400 font-mono">
        Account already exists?{" "}
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          Access_Portal →
        </Link>
      </p>
    </div>
  </>
);
