import { ThreadDetailResponse } from "@/types";
import { Button } from "@/components/ui";
import { ClientOnly } from "@/components/providers";
import {
    ChatBubbleLeftIcon,
    ShareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

interface ThreadContentCardProps {
    thread: ThreadDetailResponse;
    currentUsername?: string;
    onReply: () => void;
    onDelete: () => void;
    isDeleting: boolean;
}

export function ThreadContentCard({
    thread,
    currentUsername,
    onReply,
    onDelete,
    isDeleting,
}: ThreadContentCardProps) {
    return (
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
                        onClick={onReply}
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
                    {currentUsername === thread.author?.username && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onDelete}
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
    );
}
