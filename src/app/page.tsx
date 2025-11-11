"use client";

import Link from "next/link";
import { useAppDispatch, useAuthSelector, logoutUser } from "@/store";
import { ROUTES } from "@/constants";
import { capitalize } from "@/lib/utils";

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
              <span>
                STATUS: <span className="text-green-400">ONLINE</span>
              </span>
              <span>USERS: 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Logo and Title */}
        <div className="space-y-6">
          <div className="relative">
            <h1 className="text-6xl font-bold font-mono bg-gradient-to-r from-blue-400 via-green-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
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

        {/* System Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-gray-800/40 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4">
            <div className="text-blue-400 text-sm font-mono">THREADS</div>
            <div className="text-2xl font-bold text-white font-mono">0</div>
          </div>
          <div className="bg-gray-800/40 backdrop-blur-sm border border-green-500/30 rounded-lg p-4">
            <div className="text-green-400 text-sm font-mono">POSTS</div>
            <div className="text-2xl font-bold text-white font-mono">0</div>
          </div>
          <div className="bg-gray-800/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4">
            <div className="text-purple-400 text-sm font-mono">VOTES</div>
            <div className="text-2xl font-bold text-white font-mono">0</div>
          </div>
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
                  <Link
                    href="#"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-mono font-bold hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    $ cd dashboard
                  </Link>
                  <button
                    onClick={() => dispatch(logoutUser())}
                    className="px-6 py-3 border-2 border-red-500/50 text-red-400 rounded-lg font-mono font-bold hover:bg-red-500/10 hover:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-500/20 transition-all duration-300 backdrop-blur-sm"
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
                    className="px-6 py-3 bg-blue-700 text-white rounded-lg font-mono font-bold hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300  transform hover:-translate-y-0.5"
                  >
                    $ cd login
                  </Link>
                  <Link
                    href={ROUTES.AUTH.REGISTER}
                    className="px-6 py-3 border-2 border-blue-500/50 text-white-400 rounded-lg font-mono font-bold hover:bg-blue-500/10 hover:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
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
