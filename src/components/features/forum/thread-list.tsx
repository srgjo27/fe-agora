"use client";

import { Card } from "@/components/ui/card";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
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
          className="bg-white border border-slate-200 hover:border-blue-200 cursor-pointer group"
          onClick={() => handleViewThread(thread.id)}
        >
          <div className="p-5">
            <div className="flex items-start gap-4">
              {/* Vote Column */}
              <div className="flex flex-col items-center bg-slate-100 rounded-full px-2 py-1 border border-slate-200 min-w-[40px]">
                <HandThumbUpIcon className="w-4 h-4 text-slate-400 hover:text-blue-600 transition-colors" />
                <span
                  className={`text-sm font-semibold my-0.5 ${thread.vote_count > 0
                    ? "text-blue-600"
                    : thread.vote_count < 0
                      ? "text-red-500"
                      : "text-slate-500"
                    }`}
                >
                  {thread.vote_count}
                </span>
                <HandThumbDownIcon className="w-4 h-4 text-slate-400 hover:text-red-600 transition-colors" />
              </div>

              {/* Content Column */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  {thread.category && (
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium border border-blue-100">
                      {capitalize(thread.category.name)}
                    </span>
                  )}
                  <span>•</span>
                  <span className="text-slate-500 font-medium">
                    Posted by{" "}
                    <span className="text-blue-600 hover:text-blue-700 transition-colors">
                      {thread.author?.username || "anonymous"}
                    </span>
                  </span>
                  <span>•</span>
                  <span>{formatRelativeTime(thread.created_at)}</span>
                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                  {thread.title}
                </h3>

                {/* Badges */}
                <div className="flex items-center gap-2 pt-1">
                  {thread.is_pinned && (
                    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold bg-amber-50 text-amber-600 rounded-full border border-amber-100">
                      PINNED
                    </span>
                  )}
                  {thread.is_locked && (
                    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold bg-red-50 text-red-600 rounded-full border border-red-100">
                      LOCKED
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center gap-6 text-sm text-slate-500">
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex items-center gap-2 hover:text-blue-600 transition-colors font-medium"
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
