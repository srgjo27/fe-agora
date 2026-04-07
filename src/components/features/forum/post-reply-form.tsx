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
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
                <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                    {username?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm font-semibold text-slate-700">
                    Replying as {username}
                </span>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
                <textarea
                    className="w-full min-h-[150px] bg-transparent text-slate-900 placeholder-slate-400 text-sm resize-y focus:outline-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What are your thoughts?"
                    disabled={isSubmitting}
                    autoFocus
                />

                <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
                    <div className="text-xs text-slate-500 font-medium">Markdown supported</div>
                    <div className="flex items-center gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={onCancel}
                            disabled={isSubmitting}
                            className="text-slate-500 hover:text-slate-900"
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
