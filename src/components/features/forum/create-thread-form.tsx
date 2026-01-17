import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { CategoryResponse } from "@/types";
import {
    SparklesIcon,
    ChatBubbleBottomCenterTextIcon,
    ListBulletIcon,
} from "@heroicons/react/24/outline";

interface CreateThreadFormProps {
    formData: {
        title: string;
        content: string;
        categoryId: string;
    };
    formErrors: {
        title?: string;
        content?: string;
        categoryId?: string;
    };
    categories: CategoryResponse[];
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void;
}

export function CreateThreadForm({
    formData,
    formErrors,
    categories,
    onChange,
}: CreateThreadFormProps) {
    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/30">
                        <SparklesIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                            Create New Discussion
                        </h1>
                        <p className="text-sm text-gray-500">
                            Share your ideas with the community
                        </p>
                    </div>
                </div>
            </div>

            {/* Editor Card */}
            <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl space-y-8">
                {/* Title Input */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                        <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
                        Thread Title
                    </label>
                    <Input
                        name="title"
                        value={formData.title}
                        onChange={onChange}
                        placeholder="What's on your mind?"
                        className="text-sm bg-white/5 border-white/10 px-4 py-3 placeholder:text-gray-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 rounded-xl transition-all duration-200"
                    />
                    {formErrors.title && (
                        <p className="text-red-400 text-sm flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-red-400" />
                            {formErrors.title}
                        </p>
                    )}
                </div>

                {/* Category Selector */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                        <ListBulletIcon className="w-4 h-4" />
                        Category
                    </label>
                    <Select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={onChange}
                        options={categories.map((c) => ({
                            value: c.id,
                            label: c.name,
                        }))}
                        placeholder="Select a category..."
                        className="bg-white/5 border-white/10 text-gray-300 rounded-xl px-4 py-3 hover:border-blue-500/50 transition-all focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                    />
                    {formErrors.categoryId && (
                        <p className="text-red-400 text-sm flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-red-400" />
                            {formErrors.categoryId}
                        </p>
                    )}
                </div>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/5" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-4 bg-gray-900/40 text-xs text-gray-600 uppercase tracking-wider">
                            Content
                        </span>
                    </div>
                </div>

                {/* Content Textarea */}
                <div className="space-y-3">
                    <Textarea
                        name="content"
                        value={formData.content}
                        onChange={onChange}
                        placeholder="Share your thoughts, ideas, or questions with the community..."
                        className="w-full min-h-[400px] bg-white/5 border-white/10 p-4 text-sm text-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none leading-relaxed rounded-xl transition-all duration-200"
                    />
                    {formErrors.content && (
                        <p className="text-red-400 text-sm flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-red-400" />
                            {formErrors.content}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
