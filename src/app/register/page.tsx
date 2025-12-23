"use client";

import { RegisterForm } from "@/components/features";
import Link from "next/link";
import { ROUTES } from "@/constants";
import { motion } from "framer-motion";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left Side - Branding & Social Proof */}
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
                Join the community of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  world-class developers
                </span>
              </h1>
              <p className="text-lg text-gray-400 max-w-md">
                Connect, collaborate, and grow with the best minds in tech. Open
                source, open minds.
              </p>
            </motion.div>

            {/* Visual Element - Code Snippet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 max-w-md"
            >
              {/* Mock Code */}
              <div className="flex space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-2 font-mono text-sm">
                <div className="text-purple-400">
                  const <span className="text-blue-400">developer</span> ={" "}
                  <span className="text-yellow-400">await</span> Agora.
                  <span className="text-blue-400">join</span>();
                </div>
                <div className="text-gray-400">
                  // Welcome to the future of coding
                </div>
              </div>
            </motion.div>
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <blockquote className="text-lg text-gray-300 italic">
              "Agora completely changed how I collaborate on open source
              projects. The community is unmatched."
            </blockquote>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                SC
              </div>
              <div>
                <div className="text-white font-medium">Sarah Chen</div>
                <div className="text-sm text-gray-500">
                  Senior Engineer @ Vercel
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-950">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white">
              Create your account
            </h2>
            <p className="mt-2 text-gray-400">
              Start your journey with Agora today.
            </p>
          </div>

          <RegisterForm />
        </motion.div>
      </div>
    </div>
  );
}
