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
import { ROUTES } from "@/constants";
import { PageError } from "@/components/ui";
import { useAuthSelector } from "@/store";
import {
  ThreadDetailHeader,
  ThreadVoteRail,
  ThreadContentCard,
  PostsList,
} from "@/components/features";
import { HashtagIcon } from "@heroicons/react/24/outline";

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

  const {
    thread,
    isLoading: threadLoading,
    error: threadError,
    refetch: refetchThread,
  } = useThreadById(thread_id);
  const {
    posts,
    isLoading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = usePostsByThreadId(thread_id);
  const { createPost } = useCreatePost(thread_id);
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

  const scrollToReply = () => {
    const replySection = document.querySelector('[data-reply-section]');
    replySection?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleSubmitReply = async (content: string) => {
    if (!createPost) return;

    const newPost = await createPost(content);
    if (newPost) {
      refetchPosts?.();
    }
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
        <ThreadDetailHeader thread={thread} onBack={handleBack} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Sticky Vote Rail */}
          <div className="lg:col-span-1 hidden lg:block">
            <ThreadVoteRail
              voteCount={thread.vote_count}
              onVote={handleVote}
              isVoting={isVoting}
            />
          </div>

          {/* Right Column: Content Stream */}
          <div className="lg:col-span-11">
            <ThreadContentCard
              thread={thread}
              currentUsername={user?.username}
              onReply={scrollToReply}
              onDelete={handleDelete}
              isDeleting={isDeleting}
            />

            <div data-reply-section>
              <PostsList
                posts={posts}
                isLoading={postsLoading}
                username={user?.username}
                isAuthenticated={isAuthenticated}
                onSubmitReply={handleSubmitReply}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
