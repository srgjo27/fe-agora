import { LightBulbIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export function CreateThreadTips() {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-24">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-50">
                    <LightBulbIcon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900">Tips for Great Posts</h3>
            </div>

            <ul className="space-y-4 text-sm">
                <li className="flex gap-3 group">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mt-0.5">
                        <CheckCircleIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <strong className="text-slate-800 block mb-1">
                            Be Clear & Specific
                        </strong>
                        <span className="text-slate-500 font-medium leading-relaxed">
                            Use a descriptive title that summarizes your topic
                        </span>
                    </div>
                </li>

                <li className="flex gap-3 group">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mt-0.5">
                        <CheckCircleIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <strong className="text-slate-800 block mb-1">
                            Choose Right Category
                        </strong>
                        <span className="text-slate-500 font-medium leading-relaxed">
                            Select the most relevant category for better visibility
                        </span>
                    </div>
                </li>

                <li className="flex gap-3 group">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mt-0.5">
                        <CheckCircleIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <strong className="text-slate-800 block mb-1 font-bold">Be Respectful</strong>
                        <span className="text-slate-500 font-medium leading-relaxed">
                            Keep discussions civil and constructive
                        </span>
                    </div>
                </li>

                <li className="flex gap-3 group">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mt-0.5">
                        <CheckCircleIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <strong className="text-slate-800 block mb-1">Add Context</strong>
                        <span className="text-slate-500 font-medium leading-relaxed">
                            Provide enough details for others to understand
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    );
}
