"use client";

import { RegisterForm } from "@/components/features";
import { motion } from "framer-motion";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Side - Branding & Social Proof */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-50 overflow-hidden border-r border-slate-200">
        <div className="relative z-10 flex flex-col justify-between w-full p-12 xl:p-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">AGORA</span>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl xl:text-5xl font-bold text-slate-900 leading-tight mb-4">
                Join the community of <br />
                <span className="text-blue-600">
                  world-class developers
                </span>
              </h1>
              <p className="text-lg text-slate-500 max-w-md font-medium">
                Connect, collaborate, and grow with the best minds in tech. Open
                source, open minds.
              </p>
            </motion.div>

            {/* Visual Element - Code Snippet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl border border-slate-200 p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500 max-w-md"
            >
              {/* Mock Code */}
              <div className="flex space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="space-y-2 font-mono text-sm">
                <div className="text-slate-600">
                  const <span className="text-blue-600">developer</span> ={" "}
                  <span className="text-amber-600">await</span> Agora.
                  <span className="text-blue-600">join</span>();
                </div>
                <div className="text-slate-400">
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
            <blockquote className="text-lg text-slate-600 italic font-medium leading-relaxed">
              "Agora completely changed how I collaborate on open source
              projects. The community is unmatched."
            </blockquote>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                SC
              </div>
              <div>
                <div className="text-slate-900 font-bold">Sarah Chen</div>
                <div className="text-sm text-slate-500 font-medium">
                  Senior Engineer @ Vercel
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Create your account
            </h2>
            <p className="mt-2 text-slate-500 font-medium">
              Start your journey with Agora today.
            </p>
          </div>

          <RegisterForm />
        </motion.div>
      </div>
    </div>
  );
}
