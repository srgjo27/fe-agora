"use client";

import React from "react";
import {
  useCreatePost,
  usePostsByThreadId,
  useThreadById,
  useDeleteThread,
  useVoteThread,
} from "@/hooks/use-forum";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { capitalize, formatRelativeTime } from "@/utils";
import { ROUTES } from "@/constants";
import { PageError, Loading } from "@/components/ui";
import { useAuthSelector } from "@/store";
import { ClientOnly } from "@/components/providers";
import {
  ArrowLeftIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  TrashIcon,
  PaperAirplaneIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";

interface ForumDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ThreadSkeleton = () => (
  <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
    <div className="relative max-w-7xl mx-auto px-6 py-12">
      {/* Header Skeleton */}
      <div className="space-y-6 mb-12 max-w-4xl">
        <div className="flex items-center space-x-2 mb-8">
          <div className="h-4 w-16 bg-gray-900 rounded animate-pulse" />
          <div className="h-4 w-4 bg-gray-900 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-900 rounded animate-pulse" />
        </div>
        <div className="h-12 w-3/4 bg-gray-900 rounded animate-pulse" />
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-900 rounded-full animate-pulse" />
          <div className="h-4 w-32 bg-gray-900 rounded animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Vote Rail Skeleton */}
        <div className="lg:col-span-1 hidden lg:block">
          <div className="h-32 w-12 bg-gray-900 rounded-full animate-pulse" />
        </div>
        {/* Content Skeleton */}
        <div className="lg:col-span-11 space-y-8">
          <div className="h-64 bg-gray-900 rounded-xl animate-pulse border border-gray-800" />
          <div className="space-y-6 mt-12">
            <div className="h-8 w-32 bg-gray-900 rounded animate-pulse" />
            <div className="h-32 bg-gray-900 rounded-xl animate-pulse border border-gray-800" />
            <div className="h-32 bg-gray-900 rounded-xl animate-pulse border border-gray-800" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function ForumDetailPage({ params }: ForumDetailPageProps) {
  const { id: thread_id } = React.use(params);
  const router = useRouter();
  const { user, isAuthenticated } = useAuthSelector();
  const [showReplyForm, setShowReplyForm] = React.useState(false);
  const [replyContent, setReplyContent] = React.useState("");
  const replyFormRef = React.useRef<HTMLDivElement>(null);

  const {
    thread,
    isLoading: threadLoading,
    error: threadError,
    refetch: refetchThread,
  } = useThreadById(thread_id);
  const {
    posts,
    meta,
    isLoading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = usePostsByThreadId(thread_id);
  const { createPost, isLoading: isSubmittingReply } = useCreatePost(thread_id);
  const { deleteThread, isLoading: isDeleting } = useDeleteThread();
  const { voteThread, isLoading: isVoting } = useVoteThread();

  const handleBack = () => {
    router.push(ROUTES.COMMUNITY.FORUM);
  };

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete this thread? This action cannot be undone."
      )
    ) {
      const success = await deleteThread(thread_id);
      if (success) {
        router.push(ROUTES.COMMUNITY.FORUM);
      }
    }
  };

  const handleVote = async (voteType: number) => {
    if (!isAuthenticated) {
      router.push(ROUTES.AUTH.LOGIN);
      return;
    }

    if (isVoting) return;

    const success = await voteThread(thread_id, voteType);
    if (success) {
      refetchThread();
    }
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

  const scrollToReply = () => {
    setShowReplyForm(true);
    setTimeout(() => {
      replyFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  if (threadLoading) {
    return <ThreadSkeleton />;
  }

  if (threadError || postsError) {
    return (
      <PageError
        title="Thread Error"
        error={
          threadError ||
          postsError ||
          "This thread may have been deleted or moved."
        }
        buttonLabel="Back to Forum"
        onButtonClick={handleBack}
      />
    );
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto border border-gray-800">
            <HashtagIcon className="w-8 h-8 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-300">Thread not Found</h1>
          <Button variant="outline" onClick={handleBack}>
            Return to Forum
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white relative selection:bg-blue-500/30">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8 font-medium">
          <button
            onClick={handleBack}
            className="hover:text-blue-400 transition-colors flex items-center"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Forum
          </button>
          <span className="text-gray-700">/</span>
          <span className="text-gray-300">
            {thread.category ? capitalize(thread.category.name) : "General"}
          </span>
          <span className="text-gray-700">/</span>
          <span className="text-gray-400 truncate max-w-xs lg:max-w-md">
            {thread.title}
          </span>
        </nav>

        {/* Header Section */}
        <header className="mb-12 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            {thread.is_pinned && (
              <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold tracking-wide uppercase">
                Pinned
              </span>
            )}
            {thread.is_locked && (
              <span className="px-2.5 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-semibold tracking-wide uppercase">
                Locked
              </span>
            )}
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            {thread.title}
          </h1>

          <div className="flex items-center flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center text-gray-300 font-bold shadow-sm">
                {thread.author?.username?.[0]?.toUpperCase() || "A"}
              </div>
              <div>
                <p className="font-medium text-white">
                  {thread.author?.username || "Anonymous"}
                </p>
                <p className="text-gray-500 text-xs">Author</p>
              </div>
            </div>

            <div className="w-px h-8 bg-gray-800 hidden sm:block" />

            <div className="text-gray-400">
              <p>Posted {formatRelativeTime(thread.created_at)}</p>
              {thread.updated_at && thread.updated_at !== thread.created_at && (
                <p className="text-xs text-gray-600 mt-0.5">
                  Edited {formatRelativeTime(thread.updated_at)}
                </p>
              )}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Sticky Vote Rail */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-8 flex flex-col items-center gap-2">
              <div className="flex flex-col items-center bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full p-1.5 shadow-lg">
                <button
                  onClick={() => handleVote(1)}
                  disabled={isVoting}
                  className="p-2.5 rounded-full text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all disabled:opacity-50"
                  title="Upvote"
                >
                  <ChevronUpIcon className="w-6 h-6" />
                </button>

                <span
                  className={`font-bold text-sm py-1 ${
                    thread.vote_count > 0
                      ? "text-blue-400"
                      : thread.vote_count < 0
                      ? "text-red-400"
                      : "text-gray-400"
                  }`}
                >
                  {thread.vote_count}
                </span>

                <button
                  onClick={() => handleVote(-1)}
                  disabled={isVoting}
                  className="p-2.5 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                  title="Downvote"
                >
                  <ChevronDownIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Content Stream */}
          <div className="lg:col-span-11">
            {/* Main Post Card */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden shadow-sm mb-12">
              <div className="p-8 lg:p-10">
                <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {thread.content}
                </div>
              </div>

              {/* Action Bar */}
              <div className="bg-gray-900/80 border-t border-gray-800 px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-gray-800 gap-2"
                    onClick={scrollToReply}
                  >
                    <ChatBubbleLeftIcon className="w-4 h-4" />
                    Reply
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-gray-800 gap-2"
                  >
                    <ShareIcon className="w-4 h-4" />
                    Share
                  </Button>
                </div>

                <ClientOnly>
                  {user?.username === thread.author?.username && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-2"
                    >
                      <TrashIcon className="w-4 h-4" />
                      {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                  )}
                </ClientOnly>
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex items-center py-8 mb-8">
              <div className="flex-grow border-t border-gray-800"></div>
              <span className="flex-shrink-0 mx-4 text-gray-500 text-sm font-medium">
                {posts?.length || 0} Replies
              </span>
              <div className="flex-grow border-t border-gray-800"></div>
            </div>

            {/* Comments Section */}
            <div className="space-y-8">
              {postsLoading ? (
                <div className="flex justify-center py-12">
                  <Loading size="md" />
                </div>
              ) : !posts || posts.length === 0 ? (
                <div className="text-center py-16 bg-gray-900/30 rounded-2xl border border-gray-800 border-dashed">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChatBubbleLeftIcon className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    No replies yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Be the first to share your thoughts on this topic.
                  </p>
                  <Button
                    onClick={scrollToReply}
                    variant="outline"
                    className="border-gray-700 text-gray-300"
                  >
                    Start Discussion
                  </Button>
                </div>
              ) : (
                <div className="relative space-y-8">
                  {/* Vertical Thread Line */}
                  <div className="absolute left-5 top-4 bottom-4 w-px bg-gray-800 hidden md:block" />

                  {posts.map((post) => (
                    <div key={post.id} className="relative pl-0 md:pl-16 group">
                      {/* Connector Dot */}
                      <div className="absolute left-3 top-4 w-4 h-4 bg-gray-950 border-2 border-gray-700 rounded-full z-10 hidden md:block group-hover:border-blue-500 transition-colors" />

                      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700 text-xs font-bold text-gray-400">
                              {post.author?.username?.[0]?.toUpperCase()}
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-white block">
                                {post.author?.username}
                              </span>
                              <span className="text-xs text-gray-500 block">
                                {formatRelativeTime(post.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                          {post.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reply Form */}
            <ClientOnly>
              {isAuthenticated && (
                <div
                  ref={replyFormRef}
                  className="mt-12 pt-8 border-t border-gray-800"
                >
                  {!showReplyForm ? (
                    <button
                      onClick={() => setShowReplyForm(true)}
                      className="w-full py-4 bg-gray-900/50 border border-gray-800 border-dashed rounded-xl text-gray-500 hover:text-white hover:bg-gray-900 hover:border-gray-700 transition-all flex items-center justify-center gap-2 group"
                    >
                      <ChatBubbleLeftIcon className="w-5 h-5 group-hover:text-blue-400" />
                      <span>Write a reply...</span>
                    </button>
                  ) : (
                    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg ring-1 ring-blue-500/20">
                      <div className="p-4 bg-gray-900 border-b border-gray-800 flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                          {user?.username?.[0]?.toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-300">
                          Replying as {user?.username}
                        </span>
                      </div>

                      <form onSubmit={handleSubmitReply} className="p-4">
                        <textarea
                          className="w-full min-h-[150px] bg-transparent text-white placeholder-gray-600 text-sm resize-y focus:outline-none"
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="What are your thoughts?"
                          disabled={isSubmittingReply}
                          autoFocus
                        />

                        <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-800">
                          <div className="text-xs text-gray-500">
                            Markdown supported
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowReplyForm(false)}
                              disabled={isSubmittingReply}
                              className="text-gray-400 hover:text-white"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-500 text-white gap-2"
                              disabled={
                                !replyContent.trim() || isSubmittingReply
                              }
                              loading={isSubmittingReply}
                            >
                              <PaperAirplaneIcon className="w-4 h-4" />
                              Post Reply
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  );
}
