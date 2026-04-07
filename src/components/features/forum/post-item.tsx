import { PostResponse } from "@/types";
import { formatRelativeTime } from "@/utils";

interface PostItemProps {
    post: PostResponse;
    showConnector?: boolean;
}

export function PostItem({ post, showConnector = true }: PostItemProps) {
    return (
        <div className="relative pl-0 md:pl-16 group">
            {/* Connector Dot */}
            {showConnector && (
                <div className="absolute left-3 top-4 w-4 h-4 bg-white border-2 border-slate-300 rounded-full z-10 hidden md:block group-hover:border-blue-500 transition-colors" />
            )}

            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-200 transition-colors">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 text-xs font-bold text-slate-500">
                            {post.author?.username?.[0]?.toUpperCase()}
                        </div>
                        <div>
                            <span className="text-sm font-semibold text-slate-900 block">
                                {post.author?.username}
                            </span>
                            <span className="text-xs text-slate-500 block font-medium">
                                {formatRelativeTime(post.created_at)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {post.content}
                </div>
            </div>
        </div>
    );
}
