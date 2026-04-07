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
            <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-8 font-medium">
                <button
                    onClick={onBack}
                    className="hover:text-blue-600 transition-colors flex items-center"
                >
                    <ArrowLeftIcon className="w-4 h-4 mr-1" />
                    Forum
                </button>
                <span className="text-slate-300">/</span>
                <span className="text-slate-600">
                    {thread.category ? capitalize(thread.category.name) : "General"}
                </span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-400 truncate max-w-xs lg:max-w-md">
                    {thread.title}
                </span>
            </nav>

            {/* Header Section */}
            <header className="mb-12 max-w-5xl">
                <div className="flex items-center gap-3 mb-6">
                    {thread.is_pinned && (
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-xs font-semibold tracking-wide uppercase">
                            Pinned
                        </span>
                    )}
                    {thread.is_locked && (
                        <span className="px-2.5 py-1 bg-red-50 text-red-600 border border-red-100 rounded-full text-xs font-semibold tracking-wide uppercase">
                            Locked
                        </span>
                    )}
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
                    {thread.title}
                </h1>

                <div className="flex items-center flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold">
                            {thread.author?.username?.[0]?.toUpperCase() || "A"}
                        </div>
                        <div>
                            <p className="font-semibold text-slate-900">
                                {thread.author?.username || "Anonymous"}
                            </p>
                            <p className="text-slate-500 text-xs font-medium">Author</p>
                        </div>
                    </div>

                    <div className="w-px h-8 bg-slate-200 hidden sm:block" />

                    <div className="text-slate-500 font-medium">
                        <p>Posted {formatRelativeTime(thread.created_at)}</p>
                        {thread.updated_at && thread.updated_at !== thread.created_at && (
                            <p className="text-xs text-slate-400 mt-0.5">
                                Edited {formatRelativeTime(thread.updated_at)}
                            </p>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}
