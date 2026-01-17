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
                <div className="flex-grow border-t border-gray-800"></div>
                <span className="flex-shrink-0 mx-4 text-gray-500 text-sm font-medium">
                    {posts?.length || 0} Replies
                </span>
                <div className="flex-grow border-t border-gray-800"></div>
            </div>

            {/* Comments Section */}
            <div className="space-y-8">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loading size="md" />
                    </div>
                ) : !posts || posts.length === 0 ? (
                    <div className="text-center py-16 bg-gray-900/30 rounded-2xl border border-gray-800 border-dashed">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ChatBubbleLeftIcon className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">
                            No replies yet
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Be the first to share your thoughts on this topic.
                        </p>
                    </div>
                ) : (
                    <div className="relative space-y-8">
                        {/* Vertical Thread Line */}
                        <div className="absolute left-5 top-4 bottom-4 w-px bg-gray-800 hidden md:block" />

                        {posts.map((post) => (
                            <PostItem key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </div>

            {/* Reply Form */}
            <ClientOnly>
                {isAuthenticated && username && (
                    <div ref={replyFormRef} className="mt-12 pt-8 border-t border-gray-800">
                        {!showReplyForm ? (
                            <button
                                onClick={() => setShowReplyForm(true)}
                                className="w-full py-4 bg-gray-900/50 border border-gray-800 border-dashed rounded-xl text-gray-500 hover:text-white hover:bg-gray-900 hover:border-gray-700 transition-all flex items-center justify-center gap-2 group"
                            >
                                <ChatBubbleLeftIcon className="w-5 h-5 group-hover:text-blue-400" />
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
