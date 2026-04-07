import { PostResponse } from "@/types";
import { Loading } from "@/components/ui";
import { ClientOnly } from "@/components/providers";
import { PostItem } from "./post-item";
import { PostReplyForm } from "./post-reply-form";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useState, useRef } from "react";

interface PostsListProps {
    posts: PostResponse[] | null;
    isLoading: boolean;
    username?: string;
    isAuthenticated: boolean;
    onSubmitReply: (content: string) => Promise<void>;
}

export function PostsList({
    posts,
    isLoading,
    username,
    isAuthenticated,
    onSubmitReply,
}: PostsListProps) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const replyFormRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (content: string) => {
        setIsSubmitting(true);
        try {
            await onSubmitReply(content);
            setShowReplyForm(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Divider */}
            <div className="relative flex items-center py-8 mb-8">
                <div className="grow border-t border-slate-200"></div>
                <span className="shrink-0 mx-4 text-slate-500 text-sm font-semibold bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                    {posts?.length || 0} Replies
                </span>
                <div className="grow border-t border-slate-200"></div>
            </div>

            {/* Comments Section */}
            <div className="space-y-8">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loading size="md" />
                    </div>
                ) : !posts || posts.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 border-dashed">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                            <ChatBubbleLeftIcon className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            No replies yet
                        </h3>
                        <p className="text-slate-500 mb-6 font-medium">
                            Be the first to share your thoughts on this topic.
                        </p>
                    </div>
                ) : (
                    <div className="relative space-y-8">
                        {/* Vertical Thread Line */}
                        <div className="absolute left-5 top-4 bottom-4 w-px bg-slate-200 hidden md:block" />

                        {posts.map((post) => (
                            <PostItem key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </div>

            {/* Reply Form */}
            <ClientOnly>
                {isAuthenticated && username && (
                    <div ref={replyFormRef} className="mt-12 pt-8 border-t border-slate-200">
                        {!showReplyForm ? (
                            <button
                                onClick={() => setShowReplyForm(true)}
                                className="w-full py-4 bg-white border border-slate-200 border-dashed rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-50 hover:border-blue-300 transition-all flex items-center justify-center gap-2 group font-medium"
                            >
                                <ChatBubbleLeftIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
                                <span>Write a reply...</span>
                            </button>
                        ) : (
                            <PostReplyForm
                                username={username}
                                onSubmit={handleSubmit}
                                onCancel={() => setShowReplyForm(false)}
                                isSubmitting={isSubmitting}
                            />
                        )}
                    </div>
                )}
            </ClientOnly>
        </>
    );
}
