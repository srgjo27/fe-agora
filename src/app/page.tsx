"use client";

import Link from "next/link";
import { useAppDispatch, useAuthSelector, logoutUser } from "@/store";
import { ROUTES } from "@/constants";
import { capitalize } from "@/utils/utils";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAuthSelector();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4">
      {/* Terminal Header */}
      <div className="absolute top-8 left-8 right-8">
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-400 font-mono text-sm">
                agora_platform.exe
              </span>
            </div>
            <div className="flex items-center space-x-4 text-xs font-mono text-gray-500">
              <Link
                href={ROUTES.COMMUNITY.FORUM}
                className="px-4 py-2 border-2 border-green-500/50 text-green-500 rounded-lg font-mono font-bold hover:bg-green-500/10 hover:border-green-400 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all duration-300 backdrop-blur-sm"
              >
                $ cd forum
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Logo and Title */}
        <div className="space-y-6">
          <div className="relative">
            <h1 className="text-5xl font-bold font-mono bg-gradient-to-r from-blue-400 via-green-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              AGORA
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-lg blur opacity-25 animate-pulse"></div>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-lg text-gray-300 font-mono leading-relaxed">
              <span className="text-green-400">$</span> ./initialize_platform.sh
            </p>
            <p className="text-gray-400 font-mono mt-2">
              Agora is a modern platform that allows users to create discussion
              threads, interact through posts, and vote on content.
            </p>
          </div>
        </div>

        {/* Neural Network Animation */}
        <div className="relative max-w-4xl mx-auto h-40 overflow-hidden">
          {/* Network Grid */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-3xl h-full">
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient
                    id="lineGradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#06b6d4", stopOpacity: 0 }}
                    />
                    <stop
                      offset="50%"
                      style={{ stopColor: "#06b6d4", stopOpacity: 0.8 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#06b6d4", stopOpacity: 0 }}
                    />
                  </linearGradient>
                  <linearGradient
                    id="lineGradient2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#10b981", stopOpacity: 0 }}
                    />
                    <stop
                      offset="50%"
                      style={{ stopColor: "#10b981", stopOpacity: 0.6 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#10b981", stopOpacity: 0 }}
                    />
                  </linearGradient>
                </defs>

                {/* Animated Lines */}
                <line
                  x1="10%"
                  y1="30%"
                  x2="90%"
                  y2="30%"
                  stroke="url(#lineGradient1)"
                  strokeWidth="1"
                  className="animate-pulse"
                />
                <line
                  x1="20%"
                  y1="20%"
                  x2="80%"
                  y2="60%"
                  stroke="url(#lineGradient2)"
                  strokeWidth="1"
                  className="animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                <line
                  x1="15%"
                  y1="70%"
                  x2="85%"
                  y2="40%"
                  stroke="url(#lineGradient1)"
                  strokeWidth="1"
                  className="animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
                <line
                  x1="30%"
                  y1="10%"
                  x2="70%"
                  y2="80%"
                  stroke="url(#lineGradient2)"
                  strokeWidth="1"
                  className="animate-pulse"
                  style={{ animationDelay: "1.5s" }}
                />
              </svg>

              {/* Network Nodes */}
              <div className="absolute top-12 left-16">
                <div
                  className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"
                  style={{ animationDuration: "2s" }}
                ></div>
                <div
                  className="w-6 h-6 border border-cyan-400/50 rounded-full absolute -inset-1.5 animate-spin"
                  style={{ animationDuration: "8s" }}
                ></div>
              </div>

              <div className="absolute top-8 right-20">
                <div
                  className="w-4 h-4 bg-green-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <div
                  className="w-8 h-8 border border-green-400/40 rounded-full absolute -inset-2 animate-spin"
                  style={{ animationDuration: "6s", animationDelay: "0.3s" }}
                ></div>
              </div>

              <div className="absolute bottom-12 left-1/3">
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.6s" }}
                ></div>
                <div
                  className="w-5 h-5 border border-blue-400/60 rounded-full absolute -inset-1.5 animate-spin"
                  style={{ animationDuration: "4s", animationDelay: "0.6s" }}
                ></div>
              </div>

              <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                <div
                  className="w-5 h-5 bg-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.9s" }}
                ></div>
                <div
                  className="w-10 h-10 border border-purple-400/30 rounded-full absolute -inset-2.5 animate-spin"
                  style={{ animationDuration: "10s", animationDelay: "0.9s" }}
                ></div>
              </div>

              <div className="absolute bottom-8 right-1/4">
                <div
                  className="w-3 h-3 bg-yellow-400 rounded-full animate-ping"
                  style={{ animationDelay: "1.2s" }}
                ></div>
                <div
                  className="w-7 h-7 border border-yellow-400/50 rounded-full absolute -inset-2 animate-spin"
                  style={{ animationDuration: "5s", animationDelay: "1.2s" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Data Flow Particles */}
          <div className="absolute inset-0">
            <div
              className="absolute top-12 left-8 w-1 h-1 bg-cyan-300 rounded-full animate-ping opacity-70"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute top-20 right-12 w-1 h-1 bg-green-300 rounded-full animate-ping opacity-60"
              style={{ animationDelay: "0.4s" }}
            ></div>
            <div
              className="absolute bottom-16 left-20 w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-80"
              style={{ animationDelay: "0.8s" }}
            ></div>
            <div
              className="absolute top-24 left-2/3 w-1 h-1 bg-purple-300 rounded-full animate-ping opacity-50"
              style={{ animationDelay: "1.2s" }}
            ></div>
            <div
              className="absolute bottom-20 right-16 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-70"
              style={{ animationDelay: "1.6s" }}
            ></div>
          </div>

          {/* Central Processing Unit */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div
                className="w-16 h-16 border-2 border-cyan-400/50 rounded-lg animate-spin"
                style={{ animationDuration: "12s" }}
              ></div>
              <div
                className="w-12 h-12 border border-green-400/40 rounded-lg absolute inset-2 animate-spin"
                style={{
                  animationDuration: "8s",
                  animationDirection: "reverse",
                }}
              ></div>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-lg absolute inset-4 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Status Display */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">Link Start...</span>
              </div>
              <div className="text-cyan-400">
                Processing... <span className="animate-pulse">█</span>
              </div>
            </div>
          </div>

          {/* Glowing Background */}
          <div
            className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent animate-pulse"
            style={{ animationDuration: "4s" }}
          ></div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-6">
          {isAuthenticated && user ? (
            <div className="space-y-4">
              <div className="bg-gray-800/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-mono text-sm">
                    AUTHENTICATED
                  </span>
                </div>
                <p className="text-gray-300 font-mono mb-6">
                  Access granted,{" "}
                  <span className="text-blue-400 font-bold">
                    {user.username}
                  </span>
                  <br />
                  <span className="text-xs text-gray-500">
                    Security clearance: {capitalize(user.role)}
                  </span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {user.role === "admin" && (
                    <Link
                      href={ROUTES.DASHBOARD.HOME}
                      className="px-6 py-3 bg-purple-600 text-white text-sm rounded-lg font-mono font-bold hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      $ cd dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => dispatch(logoutUser())}
                    className="px-6 py-3 border-2 border-red-500/50 text-red-400 text-sm rounded-lg font-mono font-bold hover:bg-red-500/10 hover:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-500/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    $ ctrl + c
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-800/60 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-yellow-400 font-mono text-sm">
                    GUEST_MODE
                  </span>
                </div>
                <p className="text-gray-300 font-mono mb-6">
                  Authentication required for full platform access
                  <br />
                  <span className="text-xs text-gray-500">
                    Initialize credentials to continue
                  </span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href={ROUTES.AUTH.LOGIN}
                    className="px-5 py-3 bg-blue-600 text-white text-sm rounded-lg font-mono font-bold hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300  transform hover:-translate-y-0.5"
                  >
                    $ cd login
                  </Link>
                  <Link
                    href={ROUTES.AUTH.REGISTER}
                    className="px-6 py-3 border-2 border-blue-500/50 text-blue-400 text-sm rounded-lg font-mono font-bold hover:bg-blue-500/10 hover:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    $ cd register
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-12 pt-8 border-t border-gray-700/50">
          <div className="flex justify-center space-x-8 text-xs font-mono text-gray-500">
            <span>VERSION: 0.0.1</span>
            <span>BUILD: DEV</span>
          </div>
        </div>
      </div>

      {/* Floating Cyber Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 border border-blue-500/50 rotate-45 animate-spin [animation-duration:8s]"></div>
      <div className="absolute top-3/4 right-16 w-6 h-6 border border-green-500/30 animate-bounce"></div>
      <div className="absolute bottom-1/4 left-1/4 w-2 h-8 bg-gradient-to-t from-cyan-500/20 to-transparent animate-pulse"></div>
    </main>
  );
}
