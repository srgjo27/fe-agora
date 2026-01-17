import { useState } from "react";
import { Button } from "@/components/ui";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

interface PostReplyFormProps {
    username: string;
    onSubmit: (content: string) => Promise<void>;
    onCancel: () => void;
    isSubmitting: boolean;
}

export function PostReplyForm({
    username,
    onSubmit,
    onCancel,
    isSubmitting,
}: PostReplyFormProps) {
    const [content, setContent] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || isSubmitting) return;

        await onSubmit(content);
        setContent("");
    };

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg ring-1 ring-blue-500/20">
            <div className="p-4 bg-gray-900 border-b border-gray-800 flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                    {username?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-300">
                    Replying as {username}
                </span>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
                <textarea
                    className="w-full min-h-[150px] bg-transparent text-white placeholder-gray-600 text-sm resize-y focus:outline-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What are your thoughts?"
                    disabled={isSubmitting}
                    autoFocus
                />

                <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-800">
                    <div className="text-xs text-gray-500">Markdown supported</div>
                    <div className="flex items-center gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={onCancel}
                            disabled={isSubmitting}
                            className="text-gray-400 hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-500 text-white gap-2"
                            disabled={!content.trim() || isSubmitting}
                            loading={isSubmitting}
                        >
                            <PaperAirplaneIcon className="w-4 h-4" />
                            Post Reply
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
