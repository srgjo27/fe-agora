import { ThreadDetailResponse } from "@/types";
import { capitalize, formatRelativeTime } from "@/utils";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface ThreadDetailHeaderProps {
    thread: ThreadDetailResponse;
    onBack: () => void;
}

export function ThreadDetailHeader({
    thread,
    onBack,
}: ThreadDetailHeaderProps) {
    return (
        <>
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8 font-medium">
                <button
                    onClick={onBack}
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
        </>
    );
}
