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
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-12">
            <div className="p-8 lg:p-10">
                <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {thread.content}
                </div>
            </div>

            {/* Action Bar */}
            <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 gap-2 font-medium"
                        onClick={onReply}
                    >
                        <ChatBubbleLeftIcon className="w-4 h-4" />
                        Reply
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 gap-2 font-medium"
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
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-2 font-medium"
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
