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
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                Your Progress
            </h3>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 font-medium">Title</span>
                    <span
                        className={`text-sm font-bold ${hasTitle ? "text-green-600" : "text-slate-300"
                            }`}
                    >
                        {hasTitle ? "✓ Done" : "Pending"}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 font-medium">Category</span>
                    <span
                        className={`text-sm font-bold ${hasCategory ? "text-green-600" : "text-slate-300"
                            }`}
                    >
                        {hasCategory ? "✓ Done" : "Pending"}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 font-medium">Content</span>
                    <span
                        className={`text-sm font-bold ${hasContent ? "text-green-600" : "text-slate-300"
                            }`}
                    >
                        {hasContent ? "✓ Done" : "Pending"}
                    </span>
                </div>
            </div>
        </div>
    );
}
