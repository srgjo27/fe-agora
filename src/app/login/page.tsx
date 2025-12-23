"use client";

import { LoginForm } from "@/components/features";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left Side - Branding & Welcome */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />

        <div className="relative z-10 flex flex-col justify-between w-full p-12 xl:p-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-white">AGORA</span>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
                Welcome back to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  the future of coding
                </span>
              </h1>
              <p className="text-lg text-gray-400 max-w-md">
                Continue building, learning, and collaborating with the world's
                most innovative developer community.
              </p>
            </motion.div>

            {/* Visual Element - Community Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6 shadow-2xl max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 border-2 border-gray-800"
                    />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center text-xs text-white font-medium">
                    +2k
                  </div>
                </div>
                <div className="text-green-400 text-sm font-medium flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                  Online now
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Join 10,000+ developers building the future together.
              </p>
            </motion.div>
          </div>

          {/* Footer Text */}
          <div className="text-sm text-gray-500">
            &copy; 2025 Agora Inc. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-950">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white">
              Log in to your account
            </h2>
            <p className="mt-2 text-gray-400">
              Welcome back! Please enter your details.
            </p>
          </div>

          <LoginForm />
        </motion.div>
      </div>
    </div>
  );
}
