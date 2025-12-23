"use client";

import { Card } from "@/components/ui/card";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { ThreadSummaryResponse } from "@/types";
import { capitalize, formatRelativeTime } from "@/utils";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";

interface ThreadListProps {
  threads: ThreadSummaryResponse[];
}

export function ThreadList({ threads }: ThreadListProps) {
  const router = useRouter();

  const handleViewThread = (thread_id: string) => {
    router.push(ROUTES.COMMUNITY.FORUM_DETAIL(thread_id));
  };

  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <Card
          key={thread.id}
          className="bg-gray-900 border border-gray-800 hover:border-gray-700 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200 cursor-pointer group"
          onClick={() => handleViewThread(thread.id)}
        >
          <div className="p-5">
            <div className="flex items-start gap-5">
              {/* Vote Column */}
              <div className="flex flex-col items-center bg-gray-800/50 rounded-full px-2 py-1.5 border border-gray-700/50 min-w-[40px]">
                <ChevronUpIcon className="w-4 h-4 text-gray-500 hover:text-blue-400 transition-colors" />
                <span
                  className={`text-sm font-semibold my-0.5 ${
                    thread.vote_count > 0
                      ? "text-blue-400"
                      : thread.vote_count < 0
                      ? "text-red-400"
                      : "text-gray-400"
                  }`}
                >
                  {thread.vote_count}
                </span>
                <ChevronDownIcon className="w-4 h-4 text-gray-500 hover:text-red-400 transition-colors" />
              </div>

              {/* Content Column */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  {thread.category && (
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-medium">
                      {capitalize(thread.category.name)}
                    </span>
                  )}
                  <span>•</span>
                  <span className="text-gray-400">
                    Posted by{" "}
                    <span className="text-gray-300 font-medium hover:text-blue-400 transition-colors">
                      {thread.author?.username || "anonymous"}
                    </span>
                  </span>
                  <span>•</span>
                  <span>{formatRelativeTime(thread.created_at)}</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-100 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {thread.title}
                </h3>

                {/* Badges */}
                <div className="flex items-center gap-2 pt-1">
                  {thread.is_pinned && (
                    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold bg-yellow-500/10 text-yellow-500 rounded-full">
                      PINNED
                    </span>
                  )}
                  {thread.is_locked && (
                    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold bg-red-500/10 text-red-500 rounded-full">
                      LOCKED
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-5 py-3 bg-gray-800/30 border-t border-gray-800 flex items-center gap-6 text-sm text-gray-500">
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex items-center gap-2 hover:text-blue-400 transition-colors"
            >
              <HandThumbUpIcon className="w-4 h-4" />
              <span>Like</span>
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}
