"use client";

import { useState } from "react";
import { useThreads } from "@/hooks/use-forum";
import { useAuthStatus } from "@/store";
import { Input } from "@/components/ui/input";
import { PageError, PageLoading } from "@/components/ui";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  ForumHeader,
  ForumEmptyState,
  ForumFilter,
  ThreadList,
  ForumPagination,
  ForumSidebar,
} from "@/components/features";

export default function ForumPage() {
  const { isAuthenticated } = useAuthStatus();
  const [page, setPage] = useState(1);
  const { threads, meta, isLoading, error, refetch } = useThreads({
    page,
    limit: 10,
  });

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
    <div className="min-h-screen bg-gray-950 text-white relative">
      <ForumHeader />

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <ForumSidebar isAuthenticated={isAuthenticated} />
            </div>
          </div>

          {/* Thread List Area */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search discussions..."
                    className="pl-10 bg-gray-900 border-gray-800 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                  />
                </div>
              </div>
              <ForumFilter />
            </div>

            {!threads || threads.length === 0 ? (
              <ForumEmptyState isAuthenticated={isAuthenticated} />
            ) : (
              <>
                <ThreadList threads={threads} />
                {meta && (
                  <ForumPagination
                    page={page}
                    totalPages={meta.total_pages}
                    onPageChange={setPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
