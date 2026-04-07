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
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Create New Discussion
                        </h1>
                        <p className="text-sm text-slate-500 font-medium">
                            Share your ideas with the community
                        </p>
                    </div>
                </div>
            </div>

            {/* Editor Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-8 space-y-8">
                {/* Title Input */}
                <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <ChatBubbleBottomCenterTextIcon className="w-4 h-4 text-slate-400" />
                        Thread Title
                    </label>
                    <Input
                        name="title"
                        value={formData.title}
                        onChange={onChange}
                        placeholder="What's on your mind?"
                        error={formErrors.title}
                    />
                </div>

                {/* Category Selector */}
                <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <ListBulletIcon className="w-4 h-4 text-slate-400" />
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
                        error={formErrors.categoryId}
                    />
                </div>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-100" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-4 bg-white text-xs text-slate-400 font-bold uppercase tracking-widest">
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
                        className="min-h-[400px]"
                        error={formErrors.content}
                    />
                </div>
            </div>
        </div>
    );
}
