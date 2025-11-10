"use client";

import React from "react";
import { useThreadById } from "@/hooks/use-forum";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { capitalize, formatRelativeTime } from "@/lib/utils";
import { ROUTES } from "@/constants";
import { PageError, PageLoading } from "@/components/ui";

interface ForumDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ForumDetailPage({ params }: ForumDetailPageProps) {
  const { id: threadId } = React.use(params);

  const router = useRouter();
  const { thread, isLoading, error, refetch } = useThreadById(threadId);

  const handleBack = () => {
    router.push(ROUTES.COMMUNITY.FORUM);
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (error) {
    return (
      <PageError
        error={error}
        mainButton={{ label: "retry()", onClick: refetch, variant: "outline" }}
        secondaryButton={{
          label: "back()",
          onClick: handleBack,
          variant: "outline",
        }}
      />
    );
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center font-mono">
          <h3 className="text-gray-400 text-lg mb-4">&gt; Thread not found</h3>
          <Button
            onClick={handleBack}
            variant="outline"
            className="border-gray-500/30 text-gray-400 hover:bg-gray-500/10 font-mono"
          >
            &lt; back_to_forum()
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Enhanced Cyberpunk Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated grid layers */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.15)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:120px_120px] animate-pulse delay-1000"></div>
        </div>

        {/* Diagonal light beams */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-green-400/30 via-green-400/10 to-transparent rotate-12"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-cyan-400/25 via-cyan-400/5 to-transparent -rotate-12"></div>

        {/* Floating orbs */}
        <div className="absolute top-32 left-16 w-4 h-4 bg-green-400/60 rounded-full animate-pulse blur-sm"></div>
        <div className="absolute top-48 right-24 w-3 h-3 bg-blue-400/70 rounded-full animate-ping blur-sm"></div>
        <div className="absolute bottom-40 left-28 w-5 h-5 bg-cyan-400/50 rounded-full animate-pulse delay-500 blur-sm"></div>
        <div className="absolute bottom-24 right-16 w-2 h-2 bg-purple-400/80 rounded-full animate-ping delay-700 blur-sm"></div>

        {/* Glitch scanlines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent animate-pulse"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-pulse delay-1500"></div>
      </div>{" "}
      <div className="relative">
        {/* Header background with blur effect */}
        <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-r from-gray-900/95 via-gray-800/90 to-gray-900/95 border-b border-gray-700/60"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-8">
          {/* Navigation breadcrumb */}
          <div className="flex items-center space-x-3 mb-6 font-mono text-sm">
            <Button
              onClick={handleBack}
              variant="ghost"
              className="text-gray-400 hover:text-green-400 hover:bg-gray-800/60 border border-gray-700/50 hover:border-green-500/40 px-4 py-2 transition-all duration-300"
            >
              <span className="mr-2 text-green-400">←</span>
              forum()
            </Button>
            <span className="text-gray-500">/</span>
            <span className="text-cyan-400">thread_detail</span>
            <span className="text-gray-500">/</span>
            <span className="text-gray-400 truncate max-w-xs">
              {thread.id.slice(0, 8)}...
            </span>
          </div>

          {/* Main header content */}
          <div className="space-y-6">
            {/* Thread badges */}
            <div className="flex items-center space-x-3">
              {thread.is_pinned && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 rounded-lg backdrop-blur-sm">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-yellow-400 font-mono text-sm font-semibold">
                    PINNED
                  </span>
                </div>
              )}
              {thread.is_locked && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/40 rounded-lg backdrop-blur-sm">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-red-400 font-mono text-sm font-semibold">
                    LOCKED
                  </span>
                </div>
              )}
              {thread.category && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/40 rounded-lg backdrop-blur-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-400 font-mono text-sm font-semibold">
                    {capitalize(thread.category.name)}
                  </span>
                </div>
              )}
            </div>

            {/* Thread title */}
            <div>
              <h1 className="text-2xl md:text-3xl font-black font-mono leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
                  &gt; {thread.title}
                </span>
              </h1>
            </div>

            {/* Author and meta info */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                {/* Author avatar */}
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-green-500/40 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                    <span className="text-green-400 text-xl font-bold">
                      {thread.author?.username?.charAt(0).toUpperCase() || "A"}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                </div>

                {/* Author info */}
                <div>
                  <p className="text-lg font-semibold text-green-400 font-mono">
                    @{thread.author?.username || "anonymous"}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 font-mono">
                    <span className="flex items-center">
                      <span className="mr-1 text-blue-400">⏱</span>
                      {formatRelativeTime(thread.created_at)}
                    </span>
                    {thread.updated_at &&
                      thread.updated_at !== thread.created_at && (
                        <span className="flex items-center">
                          <span className="mr-1 text-cyan-400">↻</span>
                          updated {formatRelativeTime(thread.updated_at)}
                        </span>
                      )}
                  </div>
                </div>
              </div>

              {/* Thread stats */}
              <div className="flex items-center space-x-6 font-mono">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {thread.vote_count}
                  </div>
                  <div className="text-xs text-gray-500">votes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">0</div>
                  <div className="text-xs text-gray-500">replies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Redesigned Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Vote Panel - Left Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-8">
              {/* Vote section */}
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/60 rounded-2xl p-6 shadow-2xl">
                <div className="text-center space-y-4">
                  {/* Upvote */}
                  <button className="w-full p-4 rounded-xl bg-gray-700/50 hover:bg-green-500/20 border border-gray-600/50 hover:border-green-500/50 transition-all duration-300 group">
                    <div className="text-3xl text-gray-400 group-hover:text-green-400 transition-colors">
                      ▲
                    </div>
                  </button>

                  {/* Vote count */}
                  <div className="py-4">
                    <span
                      className={`text-3xl font-black font-mono ${
                        thread.vote_count > 0
                          ? "text-green-400"
                          : thread.vote_count < 0
                          ? "text-red-400"
                          : "text-gray-400"
                      }`}
                    >
                      {thread.vote_count}
                    </span>
                    <div className="text-sm text-gray-500 font-mono mt-1">
                      votes
                    </div>
                  </div>

                  {/* Downvote */}
                  <button className="w-full p-4 rounded-xl bg-gray-700/50 hover:bg-red-500/20 border border-gray-600/50 hover:border-red-500/50 transition-all duration-300 group">
                    <div className="text-3xl text-gray-400 group-hover:text-red-400 transition-colors">
                      ▼
                    </div>
                  </button>
                </div>

                {/* Additional actions */}
                <div className="mt-6 pt-6 border-t border-gray-700/50 space-y-3">
                  <button className="w-full p-3 rounded-lg bg-gray-700/30 hover:bg-blue-500/20 border border-gray-600/40 hover:border-blue-500/40 text-gray-400 hover:text-blue-400 font-mono text-sm transition-all duration-300">
                    <span className="mr-2">🔖</span>
                    bookmark()
                  </button>
                  <button className="w-full p-3 rounded-lg bg-gray-700/30 hover:bg-purple-500/20 border border-gray-600/40 hover:border-purple-500/40 text-gray-400 hover:text-purple-400 font-mono text-sm transition-all duration-300">
                    <span className="mr-2">📤</span>
                    share()
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-700/60 rounded-2xl shadow-2xl overflow-hidden">
              {/* Content header */}
              <div className="border-b border-gray-700/50 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-400 font-mono text-sm">
                      thread_content.md
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 font-mono">
                    <span>{thread.content.length} chars</span>
                    <span>•</span>
                    <span>markdown</span>
                  </div>
                </div>
              </div>

              {/* Thread content */}
              <div className="p-8">
                <div className="prose prose-invert max-w-none">
                  <div className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap font-mono">
                    {thread.content}
                  </div>
                </div>
              </div>

              {/* Action footer */}
              <div className="border-t border-gray-700/50 p-6 bg-gray-800/30">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-green-500/20 border border-gray-600/50 hover:border-green-500/50 text-gray-400 hover:text-green-400 font-mono transition-all duration-300">
                      <span>👍</span>
                      <span>like()</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-blue-500/20 border border-gray-600/50 hover:border-blue-500/50 text-gray-400 hover:text-blue-400 font-mono transition-all duration-300">
                      <span>💬</span>
                      <span>reply()</span>
                    </button>
                  </div>

                  <button
                    onClick={refetch}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-cyan-500/20 border border-gray-600/50 hover:border-cyan-500/50 text-gray-400 hover:text-cyan-400 font-mono transition-all duration-300"
                  >
                    <span>🔄</span>
                    <span>refresh()</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
