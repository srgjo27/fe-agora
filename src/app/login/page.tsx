"use client";

import { LoginForm } from "@/components/features";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Side - Branding & Welcome */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-100 overflow-hidden">
        {/* Subtle Background Surface */}
        <div className="absolute inset-0 bg-slate-200/20" />

        <div className="relative z-10 flex flex-col justify-between w-full p-12 xl:p-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-slate-900">AGORA</span>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl xl:text-5xl font-bold text-slate-900 leading-tight mb-4">
                Welcome back to <br />
                <span className="text-blue-600">
                  the future of coding
                </span>
              </h1>
              <p className="text-lg text-slate-600 max-w-md">
                Continue building, learning, and collaborating with the world's
                most innovative developer community.
              </p>
            </motion.div>

            {/* Visual Element - Community Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl border border-slate-200 p-6 max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"
                    />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-xs text-slate-600 font-medium">
                    +2k
                  </div>
                </div>
                <div className="text-emerald-600 text-sm font-medium flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
                  Online now
                </div>
              </div>
              <p className="text-slate-600 text-sm">
                Join 10,000+ developers building the future together.
              </p>
            </motion.div>
          </div>

          {/* Footer Text */}
          <div className="text-sm text-slate-400">
            &copy; 2025 Agora Inc. All rights reserved.
          </div>

        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900">
              Log in to your account
            </h2>
            <p className="mt-2 text-slate-500">
              Welcome back! Please enter your details.
            </p>
          </div>

          <LoginForm />
        </motion.div>
      </div>
    </div>
  );
}
