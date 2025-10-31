"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useAppDispatch,
  useAuthSelector,
  loginUser,
  clearError,
} from "@/store";
import { ROUTES } from "@/constants";

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAuthSelector();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const result = await dispatch(
        loginUser({ email: formData.email, password: formData.password })
      );
      if (loginUser.fulfilled.match(result)) {
        router.push(ROUTES.DASHBOARD.HOME);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-900/50 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg flex items-center space-x-2 backdrop-blur-sm">
          <svg
            className="w-5 h-5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-mono">AUTH_ERROR: {error}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-mono font-medium text-blue-400 mb-2"
          >
            $ ./email_input
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="user@domain.net"
            disabled={isLoading}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-gray-900/50 backdrop-blur-sm text-white font-mono placeholder-gray-500 ${
              formErrors.email
                ? "border-red-500/50 focus:border-red-400 focus:ring-red-500/20"
                : "border-gray-600/50 focus:border-blue-400 focus:ring-blue-500/20"
            } focus:outline-none focus:ring-4 disabled:opacity-50`}
          />
          {formErrors.email && (
            <div className="flex items-center mt-2 text-red-400 text-sm font-mono">
              <svg
                className="w-4 h-4 mr-1 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              AUTH_ERROR: {formErrors.email}
            </div>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-mono font-medium text-blue-400 mb-2"
          >
            $ ./password_key
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••••••"
            disabled={isLoading}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-gray-900/50 backdrop-blur-sm text-white font-mono placeholder-gray-500 ${
              formErrors.password
                ? "border-red-500/50 focus:border-red-400 focus:ring-red-500/20"
                : "border-gray-600/50 focus:border-blue-400 focus:ring-blue-500/20"
            } focus:outline-none focus:ring-4 disabled:opacity-50`}
          />
          {formErrors.password && (
            <div className="flex items-center mt-2 text-red-400 text-sm font-mono">
              <svg
                className="w-4 h-4 mr-1 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              AUTH_ERROR: {formErrors.password}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 rounded bg-gray-900/50 border-2 border-gray-600/50 text-blue-400 focus:ring-blue-500/20"
          />
          <span className="ml-2 text-sm text-gray-300 font-mono">
            cache_session
          </span>
        </label>
        <Link
          href="#"
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-mono"
        >
          recover_access?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-500 to-green-600 text-gray-900 py-3 px-4 rounded-lg font-mono font-bold hover:from-blue-400 hover:to-green-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5 border border-blue-400/30"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
            AUTHENTICATING...
          </div>
        ) : (
          "$ EXECUTE_LOGIN"
        )}
      </button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600/50"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-800 text-gray-400 font-mono">
            OR_QUICK_ACCESS
          </span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        {/* Development Notice */}
        <div className="bg-yellow-900/30 border border-yellow-500/30 text-yellow-300 px-4 py-3 rounded-lg flex items-center space-x-2 backdrop-blur-sm">
          <svg
            className="w-5 h-5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-mono">
            DEV_MODE: Social authentication protocols under development
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 opacity-50">
          <button
            type="button"
            disabled
            className="w-full inline-flex justify-center items-center px-4 py-3 border-2 border-gray-700/50 rounded-lg text-sm font-mono font-medium text-gray-500 bg-gray-900/20 backdrop-blur-sm cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            GOOGLE [DEV]
          </button>

          <button
            type="button"
            disabled
            className="w-full inline-flex justify-center items-center px-4 py-3 border-2 border-gray-700/50 rounded-lg text-sm font-mono font-medium text-gray-500 bg-gray-900/20 backdrop-blur-sm cursor-not-allowed"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GITHUB [DEV]
          </button>
        </div>
      </div>

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
    </form>
  );
};
