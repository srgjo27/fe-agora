"use client";

import { useThreads } from "@/hooks/use-forum";
import { useAuthStatus } from "@/store";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { capitalize, formatRelativeTime } from "@/utils";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
import { Background, PageError, PageLoading } from "@/components/ui";

export default function ForumPage() {
  const { isAuthenticated } = useAuthStatus();
  const { threads, isLoading, error, refetch } = useThreads({
    page: 1,
    limit: 10,
  });
  const router = useRouter();

  const handleViewThread = async (thread_id: string) => {
    router.push(ROUTES.COMMUNITY.FORUM_DETAIL(thread_id));
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (error) {
    return (
      <PageError
        title="Thread not found"
        error={error}
        buttonLabel="Retry"
        onButtonClick={refetch}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Cyberpunk Grid Background - matching root layout */}
      <Background />

      {/* Header Section */}
      <div className="relative backdrop-blur-xl bg-gray-900/80 border-b border-gray-700/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-800 border border-green-500/30 rounded-lg flex items-center justify-center shadow-2xl shadow-green-500/25 font-mono">
                    <span className="text-green-400 text-2xl font-bold">
                      &gt;
                    </span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl font-black font-mono bg-gradient-to-r from-green-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
                    &gt; FORUM_
                  </h1>
                  <p className="text-gray-300 text-md font-mono mt-1">
                    // Connect, collaborate, and code together
                  </p>
                </div>
              </div>

              {/* Stats Pills */}
              <div className="flex items-center space-x-4 font-mono">
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-green-500/30 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-300">
                    users_online: 0
                  </span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-blue-500/30 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-300">
                    posts_today: 0
                  </span>
                </div>
              </div>
            </div>

            {isAuthenticated && (
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="bg-gray-800 border border-green-500/50 hover:border-green-400 hover:bg-gray-700 shadow-xl shadow-green-500/25 transform hover:scale-105 transition-all duration-200 text-lg px-8 py-4 font-mono text-green-400 hover:text-green-300"
                >
                  <span className="mr-3 text-green-400">&gt;</span>
                  new_thread()
                </Button>
                <div className="flex space-x-2 font-mono">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50 border border-gray-600/50 hover:border-cyan-500/30"
                  >
                    <span className="mr-2 text-cyan-400">#</span>
                    saved
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-blue-400 hover:bg-gray-800/50 border border-gray-600/50 hover:border-blue-500/30"
                  >
                    <span className="mr-2 text-blue-400">~</span>
                    drafts
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {!threads || threads.length === 0 ? (
          <Card className="backdrop-blur-xl bg-gray-800/50 border border-gray-600/50 text-center shadow-2xl">
            <CardContent className="py-24 font-mono">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gray-700 border border-gray-500/30 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm shadow-xl">
                  <div className="w-24 h-24 bg-gray-800 border border-green-500/30 flex items-center justify-center shadow-xl">
                    <span className="text-4xl text-green-400">?</span>
                  </div>
                </div>
                <div className="absolute -top-2 -right-8 w-6 h-6 bg-green-400 rounded-full animate-pulse delay-300"></div>
                <div className="absolute -bottom-2 -left-8 w-4 h-4 bg-blue-400 rounded-full animate-pulse delay-700"></div>
              </div>
              <h3 className="text-3xl font-bold text-green-400 mb-4">
                &gt; No threads found
              </h3>
              <p className="text-gray-300 mb-8 text-lg max-w-md mx-auto leading-relaxed">
                // Start the first discussion in this terminal
              </p>
              {isAuthenticated && (
                <Button
                  size="lg"
                  className="bg-gray-800 border border-green-500/50 hover:border-green-400 hover:bg-gray-700 shadow-xl shadow-green-500/25 transform hover:scale-105 transition-all duration-300 text-lg px-10 py-4 font-mono text-green-400 hover:text-green-300"
                >
                  <span className="mr-2">&gt;</span>
                  init_first_thread()
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Terminal Stats Bar */}
            <div className="backdrop-blur-xl bg-gray-800/50 border border-gray-600/50 p-6 shadow-xl font-mono">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-700 border border-green-500/30 flex items-center justify-center shadow-lg">
                      <span className="text-green-400 font-bold text-lg">
                        {threads?.length || 0}
                      </span>
                    </div>
                    <div>
                      <p className="text-green-400 font-semibold text-lg">
                        threads_active
                      </p>
                      <p className="text-gray-400 text-sm">
                        // current discussions
                      </p>
                    </div>
                  </div>
                  <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent"></div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-400">0</p>
                      <p className="text-gray-400 text-xs">views_today</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-cyan-400">0</p>
                      <p className="text-gray-400 text-xs">new_replies</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-green-400 hover:bg-gray-700/50 border border-gray-600/30 hover:border-green-500/30 backdrop-blur-sm font-mono"
                  >
                    <span className="mr-2 text-green-400">|</span>
                    filter
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 border border-gray-600/30 hover:border-blue-500/30 backdrop-blur-sm font-mono"
                  >
                    <span className="mr-2 text-blue-400">^</span>
                    sort_latest
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-cyan-400 hover:bg-gray-700/50 border border-gray-600/30 hover:border-cyan-500/30 backdrop-blur-sm font-mono"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>

            {/* Thread List */}
            <div className="space-y-6 font-mono">
              {threads?.map((thread, _) => (
                <Card
                  key={thread.id}
                  className="backdrop-blur-xl bg-gray-800/50 border border-gray-600/50 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10 cursor-pointer group transform hover:scale-[1.02] relative overflow-hidden animate-[fadeInUp_0.6s_ease-out_forwards]"
                >
                  {/* Terminal glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <CardHeader className="relative">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-4">
                        {/* Terminal Badges Row */}
                        <div className="flex items-center space-x-3">
                          {thread.is_pinned && (
                            <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-gray-700/50 text-yellow-400 border border-yellow-500/30 backdrop-blur-sm">
                              <span className="mr-2">^</span>
                              PINNED
                            </span>
                          )}
                          {thread.is_locked && (
                            <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-gray-700/50 text-red-400 border border-red-500/30 backdrop-blur-sm">
                              <span className="mr-2">!</span>
                              LOCKED
                            </span>
                          )}
                          {thread.category && (
                            <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-gray-700/50 text-blue-400 border border-blue-500/30 backdrop-blur-sm">
                              <span className="w-2 h-2 bg-blue-400 mr-2"></span>
                              {capitalize(thread.category.name)}
                            </span>
                          )}
                        </div>

                        {/* Terminal Title */}
                        <CardTitle className="text-2xl font-bold text-green-400 group-hover:text-cyan-400 transition-all duration-300 line-clamp-2 leading-tight">
                          &gt; {thread.title}
                        </CardTitle>
                      </div>

                      {/* Terminal Vote Section */}
                      <div className="flex flex-col items-center space-y-2 ml-6">
                        <div className="flex flex-col items-center space-y-1 p-3 backdrop-blur-sm bg-gray-700/50 border border-gray-600/30">
                          <span className="text-green-400 text-lg">^</span>
                          <span
                            className={`text-lg font-bold ${
                              thread.vote_count > 0
                                ? "text-green-400"
                                : thread.vote_count < 0
                                ? "text-red-400"
                                : "text-gray-400"
                            }`}
                          >
                            {thread.vote_count}
                          </span>
                          <span className="text-red-400 text-lg">v</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardFooter className="pt-0 relative">
                    <div className="flex items-center justify-between w-full">
                      {/* Terminal Author Info */}
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gray-700 border border-green-500/30 flex items-center justify-center text-lg font-bold shadow-xl">
                            <span className="text-green-400">
                              {thread.author?.username
                                ?.charAt(0)
                                .toUpperCase() || "U"}
                            </span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-gray-800"></div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-lg font-semibold text-green-400">
                            by: {thread.author?.username || "anonymous"}
                          </p>
                          <div className="flex items-center space-x-3 text-sm text-gray-400">
                            <span className="flex items-center">
                              <span className="mr-1 text-blue-400"></span>
                              {formatRelativeTime(thread.created_at)}
                            </span>
                            <span className="w-1 h-1 bg-gray-500"></span>
                            <span className="flex items-center">
                              <span className="mr-1 text-cyan-400">#</span>0
                              views
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Terminal Action Buttons */}
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-gray-400 hover:text-green-400 hover:bg-gray-700/50 border border-gray-600/50 hover:border-green-500/30 font-mono"
                        >
                          <span className="mr-2 text-green-400">+</span>
                          like()
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 border border-gray-600/50 hover:border-blue-500/30 font-mono"
                        >
                          <span className="mr-2 text-blue-400">&gt;</span>
                          reply()
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewThread(thread.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150 text-cyan-400 bg-gray-800/50 hover:bg-gray-700 border border-cyan-500/30 hover:border-cyan-400 shadow-lg px-6 font-mono"
                        >
                          view_thread()
                          <span className="ml-2 text-cyan-400">&gt;&gt;</span>
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Terminal Load More Section */}
            <div className="flex justify-center pt-12">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 blur-xl"></div>
                <Button
                  size="lg"
                  className="relative backdrop-blur-xl bg-gray-800/50 border border-green-500/50 hover:border-green-400 text-green-400 hover:text-green-300 hover:bg-gray-700 transform hover:scale-105 transition-all duration-300 px-12 py-4 text-lg font-semibold font-mono shadow-2xl"
                >
                  <span className="mr-3 text-green-400">&gt;</span>
                  load_more_threads()
                  <div className="absolute -inset-1 bg-green-500/30 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </Button>
              </div>
            </div>

            {/* Terminal Footer Info */}
            <div className="text-center pt-16 pb-8">
              <div className="backdrop-blur-xl bg-gray-800/50 border border-gray-600/50 p-8 max-w-2xl mx-auto font-mono">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gray-700 border border-green-500/30 flex items-center justify-center">
                    <span className="text-green-400 text-lg font-bold">
                      &gt;
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-green-400">
                    system.forum.status
                  </h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  // connecting developers worldwide through terminal interface
                </p>
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 animate-pulse"></div>
                    <span>users_online: 0</span>
                  </div>
                  <div className="w-px h-4 bg-gray-600"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 animate-pulse"></div>
                    <span>posts_today: 0</span>
                  </div>
                  <div className="w-px h-4 bg-gray-600"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 animate-pulse"></div>
                    <span>active_threads: 0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
