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
                <div className="absolute left-3 top-4 w-4 h-4 bg-gray-950 border-2 border-gray-700 rounded-full z-10 hidden md:block group-hover:border-blue-500 transition-colors" />
            )}

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
    );
}
