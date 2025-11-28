"use client";

import {
    Card,
} from "@/components/ui/card";
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
        <div className="space-y-4 font-mono">
            {threads.map((thread) => (
                <Card
                    key={thread.id}
                    className="bg-gray-800/30 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 cursor-pointer group relative overflow-hidden"
                    onClick={() => handleViewThread(thread.id)}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="p-6">
                        <div className="flex items-start gap-4">
                            {/* Vote Column */}
                            <div className="flex flex-col items-center space-y-1 bg-gray-900/50 rounded-lg p-2 border border-gray-700/50">
                                <ChevronUpIcon className="w-4 h-4 text-gray-400 hover:text-green-400 transition-colors" />
                                <span
                                    className={`text-sm font-bold ${thread.vote_count > 0
                                        ? "text-green-400"
                                        : thread.vote_count < 0
                                            ? "text-red-400"
                                            : "text-gray-400"
                                        }`}
                                >
                                    {thread.vote_count}
                                </span>
                                <ChevronDownIcon className="w-4 h-4 text-gray-400 hover:text-red-400 transition-colors" />
                            </div>

                            {/* Content Column */}
                            <div className="flex-1 min-w-0 space-y-2">
                                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                                    {thread.category && (
                                        <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                            {capitalize(thread.category.name)}
                                        </span>
                                    )}
                                    <span>•</span>
                                    <span className="text-gray-500">
                                        Posted by{" "}
                                        <span className="text-gray-300 hover:text-green-400 transition-colors">
                                            {thread.author?.username || "anonymous"}
                                        </span>
                                    </span>
                                    <span>•</span>
                                    <span>{formatRelativeTime(thread.created_at)}</span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-100 group-hover:text-green-400 transition-colors line-clamp-2">
                                    {thread.title}
                                </h3>

                                {/* Badges */}
                                <div className="flex items-center gap-2 pt-1">
                                    {thread.is_pinned && (
                                        <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded">
                                            PINNED
                                        </span>
                                    )}
                                    {thread.is_locked && (
                                        <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold bg-red-500/10 text-red-500 border border-red-500/20 rounded">
                                            LOCKED
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="px-6 py-3 bg-gray-900/30 border-t border-gray-700/50 flex items-center gap-4 text-sm text-gray-400">
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
