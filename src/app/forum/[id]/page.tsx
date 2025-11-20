"use client";

import React from "react";
import {
  useCreatePost,
  usePostsByThreadId,
  useThreadById,
} from "@/hooks/use-forum";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { capitalize, formatRelativeTime } from "@/utils";
import { ROUTES } from "@/constants";
import { PageError, PageLoading } from "@/components/ui";
import { useAuthSelector } from "@/store";
import {
  ArrowLeftIcon,
  ClockIcon,
  ArrowPathIcon,
  BookmarkIcon,
  ShareIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

interface ForumDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ForumDetailPage({ params }: ForumDetailPageProps) {
  const { id: thread_id } = React.use(params);
  const router = useRouter();
  const { user, isAuthenticated } = useAuthSelector();
  const [showReplyForm, setShowReplyForm] = React.useState(false);
  const [replyContent, setReplyContent] = React.useState("");

  const {
    thread,
    isLoading: threadLoading,
    error: threadError,
  } = useThreadById(thread_id);
  const {
    posts,
    meta,
    isLoading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = usePostsByThreadId(thread_id);
  const { createPost, isLoading: isSubmittingReply } = useCreatePost(thread_id);

  const handleBack = () => {
    router.push(ROUTES.COMMUNITY.FORUM);
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || isSubmittingReply || !createPost) return;

    const newPost = await createPost(replyContent);

    if (newPost) {
      setReplyContent("");
      setShowReplyForm(false);
      refetchPosts?.();
    }
  };

  const handleCancelReply = () => {
    setShowReplyForm(false);
    setReplyContent("");
  };

  if (threadLoading) {
    return <PageLoading />;
  }

  if (threadError || postsError) {
    return (
      <PageError
        title="Thread Error"
        error={
          threadError ||
          postsError ||
          "This thread may have been deleted or moved. Please check the URL and try again."
        }
        buttonLabel="Back"
        onButtonClick={handleBack}
      />
    );
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-mono text-gray-300">Thread not Found</h1>
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
      </div>

      <div className="relative">
        {/* Header background with blur effect */}
        <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-r from-gray-900/95 via-gray-800/90 to-gray-900/95 border-b border-gray-700/60"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-8">
          {/* Navigation breadcrumb */}
          <div className="flex items-center space-x-3 mb-6 font-mono text-xs">
            <Button
              className="text-gray-400 hover:text-green-400 hover:bg-gray-800/60 border border-gray-700/50 hover:border-green-500/40 px-4 py-2 transition-all duration-300"
              variant="ghost"
              size="sm"
              onClick={handleBack}
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2 text-green-400" />
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
                  <span className="text-yellow-400 font-mono text-xs font-semibold">
                    PINNED
                  </span>
                </div>
              )}
              {thread.is_locked && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/40 rounded-lg backdrop-blur-sm">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-red-400 font-mono text-xs font-semibold">
                    LOCKED
                  </span>
                </div>
              )}
              {thread.category && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/40 rounded-lg backdrop-blur-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-400 font-mono text-xs font-semibold">
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
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-green-500/40 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
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
                  <div className="flex items-center space-x-4 text-xs text-gray-400 font-mono">
                    <span className="flex items-center">
                      <ClockIcon className="w-3 h-3 mr-1 text-blue-400" />
                      {formatRelativeTime(thread.created_at)}
                    </span>
                    {thread.updated_at &&
                      thread.updated_at !== thread.created_at && (
                        <span className="flex items-center">
                          <ArrowPathIcon className="w-3 h-3 mr-1 text-cyan-400" />
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
                  <div className="text-2xl font-bold text-blue-400">
                    {posts?.length || 0}
                  </div>
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
                    <ChevronUpIcon className="w-4 h-4 mx-auto text-gray-400 group-hover:text-green-400 transition-colors" />
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
                    <ChevronDownIcon className="w-4 h-4 mx-auto text-gray-400 group-hover:text-red-400 transition-colors" />
                  </button>
                </div>

                {/* Additional actions */}
                <div className="mt-6 pt-6 border-t border-gray-700/50 space-y-3">
                  <button className="w-full flex items-center justify-center p-3 rounded-lg bg-gray-700/30 hover:bg-blue-500/20 border border-gray-600/40 hover:border-blue-500/40 text-gray-400 hover:text-blue-400 font-mono text-sm transition-all duration-300">
                    <BookmarkIcon className="w-4 h-4 mr-2" />
                    bookmark()
                  </button>
                  <button className="w-full flex items-center justify-center p-3 rounded-lg bg-gray-700/30 hover:bg-purple-500/20 border border-gray-600/40 hover:border-purple-500/40 text-gray-400 hover:text-purple-400 font-mono text-sm transition-all duration-300">
                    <ShareIcon className="w-4 h-4 mr-2" />
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
              <div className="border-b border-gray-700/50 p-4">
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
                  <div className="flex items-center space-x-4 text-sm text-gray-500 font-mono"></div>
                </div>
              </div>

              {/* Thread content */}
              <div className="p-8">
                <div className="prose prose-invert max-w-none">
                  <div className="text-gray-200 text-base leading-relaxed whitespace-pre-wrap font-mono">
                    {thread.content}
                  </div>
                </div>
              </div>

              {/* Action footer */}
              <div className="border-t border-gray-700/50 p-4 bg-gray-800/30">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => {
                        const repliesSection =
                          document.getElementById("replies-section");
                        repliesSection?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-blue-500/20 border border-gray-600/50 hover:border-blue-500/50 text-gray-400 hover:text-blue-400 font-mono transition-all duration-300 hover:scale-105"
                    >
                      <ArrowDownIcon className="w-3 h-3" />
                      <span className="text-xs">
                        View Replies ({posts?.length || 0})
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Replies Section - Simple & Clean */}
            <div id="replies-section" className="mt-8">
              {/* Simple Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
                  <h2 className="text-lg font-mono font-semibold text-cyan-400">
                    replies/
                  </h2>
                  <span className="text-gray-500 font-mono text-sm">
                    [{posts?.length || 0}]
                  </span>
                </div>
                <button
                  onClick={() => refetchPosts?.()}
                  className="text-gray-500 hover:text-cyan-400 transition-colors duration-200"
                >
                  <ArrowPathIcon className="w-3 h-3" />
                </button>
              </div>

              {/* Content */}
              {postsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping delay-100"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping delay-200"></div>
                    <span className="text-gray-400 font-mono text-sm ml-3">
                      loading...
                    </span>
                  </div>
                </div>
              ) : !posts || posts.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="text-gray-500 font-mono text-sm mb-4">
                    // no replies yet
                  </div>
                  {isAuthenticated && (
                    <Button className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-400 font-mono text-sm">
                      + add_reply()
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {posts.map((post, index) => (
                    <div
                      key={post.id}
                      className="border-l-2 border-cyan-500/30 pl-4 py-3 hover:border-cyan-400/50 hover:bg-gray-800/20 rounded-r-lg transition-all duration-200"
                    >
                      {/* Reply Header - Compact */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {/* Simple Avatar */}
                          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-lg flex items-center justify-center border border-cyan-500/40">
                            <span className="text-cyan-300 text-sm font-mono font-bold">
                              {post.author?.username.charAt(0).toUpperCase() ||
                                "U"}
                            </span>
                          </div>

                          {/* User & Meta */}
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-cyan-400 font-mono text-sm font-semibold">
                                @{post.author?.username || "unknown"}
                              </span>
                              <span className="text-gray-600 font-mono text-xs">
                                #{index + 1}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3 text-xs text-gray-500 font-mono">
                              <span>{formatRelativeTime(post.created_at)}</span>
                              {post.updated_at &&
                                post.updated_at !== post.created_at && (
                                  <span className="text-cyan-500">edited</span>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Reply Content - Clean */}
                      <div className="ml-11 mb-3">
                        <div className="text-gray-200 text-sm leading-relaxed">
                          {post.content}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Simple Pagination */}
                  {meta && meta.total_items >= (posts?.length || 0) && (
                    <div className="mt-4 pt-4 border-t border-gray-700/30 text-center">
                      <div className="text-gray-500 font-mono text-xs">
                        {posts?.length || 0} of {meta.total_items} replies
                        {meta.current_page <= meta.total_pages &&
                          ` | page ${meta.current_page}/${meta.total_pages}`}
                      </div>
                      {meta.current_page < meta.total_pages && (
                        <Button className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-400 font-mono text-xs px-4 py-2">
                          load_more()
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Add Reply Section */}
              {isAuthenticated && (
                <div className="mt-4 pt-4 border-t border-gray-700/30">
                  {!showReplyForm ? (
                    <div className="text-center">
                      <Button
                        className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-400 font-mono text-sm px-6 py-3 transition-all duration-300 hover:scale-105"
                        onClick={() => setShowReplyForm(true)}
                      >
                        + write_reply()
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-700/60 rounded-2xl shadow-2xl overflow-hidden">
                      {/* Reply Form Header */}
                      <div className="border-b border-gray-700/50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-cyan-400 font-mono text-sm">
                              reply_composer.md
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                            <span className="text-gray-500 font-mono text-xs">
                              composing...
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Reply Form */}
                      <form onSubmit={handleSubmitReply} className="p-6">
                        <div className="space-y-4">
                          {/* User Info */}
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-lg flex items-center justify-center border border-cyan-500/40">
                              <span className="text-cyan-300 text-sm font-mono font-bold">
                                {user?.username
                                  ? user.username.charAt(0).toUpperCase()
                                  : "Me"}
                              </span>
                            </div>
                            <div>
                              <span className="text-cyan-400 font-mono text-sm font-semibold">
                                @{user?.username || "you"}
                              </span>
                              <div className="text-xs text-gray-500 font-mono">
                                writing a reply...
                              </div>
                            </div>
                          </div>

                          {/* Content Textarea */}
                          <div className="relative">
                            <textarea
                              className="w-full min-h-[120px] bg-gray-800/50 border border-gray-600/50 rounded-lg p-4 text-gray-200 placeholder-gray-500 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              placeholder="// write your reply here..."
                              disabled={isSubmittingReply}
                            />
                            <div className="absolute bottom-3 right-3 text-xs text-gray-500 font-mono">
                              {replyContent.length}/1000
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-700/30">
                            <div className="text-xs text-gray-500 font-mono">
                              Press{" "}
                              <span className="text-cyan-400">Ctrl+Enter</span>{" "}
                              to submit
                            </div>

                            <div className="flex items-center space-x-3">
                              <Button
                                type="button"
                                className="bg-gray-700/50 hover:bg-red-500/20 border border-gray-600/50 hover:border-red-500/50 text-gray-400 hover:text-red-400 font-mono text-sm px-4 py-2 transition-all duration-300"
                                onClick={handleCancelReply}
                                disabled={isSubmittingReply}
                              >
                                cancel()
                              </Button>

                              <Button
                                type="submit"
                                className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-400 font-mono text-sm px-6 py-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                disabled={!replyContent.trim()}
                                loading={isSubmittingReply}
                              >
                                submit_reply()
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
