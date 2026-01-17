interface CreateThreadProgressProps {
    hasTitle: boolean;
    hasCategory: boolean;
    hasContent: boolean;
}

export function CreateThreadProgress({
    hasTitle,
    hasCategory,
    hasContent,
}: CreateThreadProgressProps) {
    return (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Your Progress
            </h3>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Title</span>
                    <span
                        className={`text-sm font-medium ${hasTitle ? "text-green-400" : "text-gray-600"
                            }`}
                    >
                        {hasTitle ? "✓ Done" : "Pending"}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Category</span>
                    <span
                        className={`text-sm font-medium ${hasCategory ? "text-green-400" : "text-gray-600"
                            }`}
                    >
                        {hasCategory ? "✓ Done" : "Pending"}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Content</span>
                    <span
                        className={`text-sm font-medium ${hasContent ? "text-green-400" : "text-gray-600"
                            }`}
                    >
                        {hasContent ? "✓ Done" : "Pending"}
                    </span>
                </div>
            </div>
        </div>
    );
}
