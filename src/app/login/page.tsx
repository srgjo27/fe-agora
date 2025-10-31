"use client";

import { LoginForm } from "@/components/features";
import { ROUTES } from "@/constants";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
                 linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
               `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Floating Neon Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Neon Orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-400 rounded-full opacity-30 blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-40 w-28 h-28 bg-purple-400 rounded-full opacity-25 blur-xl animate-ping"></div>

        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-gray-800/50 backdrop-blur-md border-b border-green-500/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/25 border border-green-400/30">
                <svg
                  className="h-6 w-6 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                AGORA
              </span>
            </div>

            {/* Register Link */}
            <Link
              href={ROUTES.AUTH.REGISTER}
              className="px-6 py-2 text-sm font-medium text-green-400 hover:text-green-300 transition-all duration-300 border border-green-500/30 rounded-lg hover:border-green-400/50 hover:bg-green-500/10"
            >
              Initialize Account →
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Cyber Access Panel */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-16">
          <div className="max-w-lg">
            {/* Access Status */}
            <div className="inline-flex items-center px-4 py-2 bg-gray-800/60 rounded-lg text-blue-400 text-sm font-mono mb-8 border border-blue-500/30 shadow-lg shadow-blue-500/10">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
              ACCESS_PORTAL: READY
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 font-mono">
              <span className="text-blue-400">&gt;</span> AUTHENTICATE
              <span className="block text-green-400 mt-2">
                USER_CREDENTIALS
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Re-establish connection to the developer neural network. Your
              digital identity awaits verification.
            </p>

            {/* System Statistics */}
            <div className="space-y-4 mb-12">
              {[
                {
                  metric: "ACTIVE_SESSIONS",
                  value: "10,847",
                  color: "text-green-400",
                },
                {
                  metric: "DATA_STREAMS",
                  value: "2.4TB/s",
                  color: "text-blue-400",
                },
                {
                  metric: "NEURAL_LINKS",
                  value: "50K+",
                  color: "text-purple-400",
                },
                { metric: "UPTIME", value: "99.98%", color: "text-yellow-400" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-gray-400 font-mono text-sm">
                      {item.metric}
                    </div>
                    <div
                      className={`${item.color} font-mono font-bold text-lg`}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Security Notice */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-green-500/30 shadow-lg shadow-green-500/10">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-mono font-bold border border-green-400/30">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-mono font-bold">
                    SECURITY_PROTOCOL
                  </div>
                  <div className="text-green-400 text-sm font-mono">
                    256-bit Quantum Encryption
                  </div>
                </div>
              </div>
              <p className="text-gray-300 font-mono text-sm">
                "Your data is protected by military-grade encryption algorithms.
                Zero-trust architecture ensures maximum security."
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Access Terminal */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-4xl font-bold font-mono text-white mb-2">
                <span className="text-blue-400">&gt;</span> ACCESS_AGORA
              </h1>
              <p className="text-gray-400 font-mono">
                authenticate_credentials
              </p>
            </div>

            {/* Terminal Window */}
            <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-500/30 overflow-hidden shadow-blue-500/20">
              {/* Terminal Header */}
              <div className="bg-gray-900/90 px-6 py-4 border-b border-gray-700/50">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-gray-400 font-mono text-sm">
                    root@agora:~/authentication
                  </div>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="text-blue-400 font-mono text-sm mb-2">
                    $ authenticate_user_session
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2 font-mono">
                    ACCESS_CONTROL_LOGIN
                  </h2>
                  <p className="text-gray-400 font-mono text-sm">
                    Verify identity to access the network
                  </p>
                </div>

                <LoginForm />
              </div>
            </div>

            {/* Network Status */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 font-mono text-sm mb-4">
                SECURED_BY: QUANTUM_ENCRYPTION
              </p>
              <div className="flex items-center justify-center space-x-8 opacity-60">
                <div className="text-green-400 font-mono text-sm">
                  FIREWALL_ACTIVE
                </div>
                <div className="text-blue-400 font-mono text-sm">
                  SSL_VERIFIED
                </div>
                <div className="text-purple-400 font-mono text-sm">
                  DDoS_PROTECTED
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
