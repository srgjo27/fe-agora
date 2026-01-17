import { LightBulbIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export function CreateThreadTips() {
    return (
        <div className="bg-gradient-to-br from-blue-500/10 to-violet-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 shadow-xl sticky top-24">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/20">
                    <LightBulbIcon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white">Tips for Great Posts</h3>
            </div>

            <ul className="space-y-4 text-sm">
                <li className="flex gap-3 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/30 flex items-center justify-center mt-0.5">
                        <CheckCircleIcon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                        <strong className="text-gray-200 block mb-1">
                            Be Clear & Specific
                        </strong>
                        <span className="text-gray-500 leading-relaxed">
                            Use a descriptive title that summarizes your topic
                        </span>
                    </div>
                </li>

                <li className="flex gap-3 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/30 flex items-center justify-center mt-0.5">
                        <CheckCircleIcon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                        <strong className="text-gray-200 block mb-1">
                            Choose Right Category
                        </strong>
                        <span className="text-gray-500 leading-relaxed">
                            Select the most relevant category for better visibility
                        </span>
                    </div>
                </li>

                <li className="flex gap-3 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/30 flex items-center justify-center mt-0.5">
                        <CheckCircleIcon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                        <strong className="text-gray-200 block mb-1">Be Respectful</strong>
                        <span className="text-gray-500 leading-relaxed">
                            Keep discussions civil and constructive
                        </span>
                    </div>
                </li>

                <li className="flex gap-3 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/30 flex items-center justify-center mt-0.5">
                        <CheckCircleIcon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                        <strong className="text-gray-200 block mb-1">Add Context</strong>
                        <span className="text-gray-500 leading-relaxed">
                            Provide enough details for others to understand
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    );
}
