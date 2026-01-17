import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

interface CreateThreadHeaderProps {
    onBack: () => void;
    onDiscard: () => void;
    onPublish: () => void;
    isSubmitting: boolean;
}

export function CreateThreadHeader({
    onBack,
    onDiscard,
    onPublish,
    isSubmitting,
}: CreateThreadHeaderProps) {
    return (
        <header className="sticky top-0 z-50 border-b border-white/5 bg-gray-950/60 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        onClick={onBack}
                        className="text-gray-400 hover:text-white hover:bg-white/5 -ml-2 group transition-all duration-200"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </Button>
                    <div className="h-4 w-px bg-white/10" />
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-xs font-medium text-amber-400">Draft</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        onClick={onDiscard}
                        className="text-gray-400 hover:text-white hover:bg-white/5"
                    >
                        Discard
                    </Button>
                    <Button
                        onClick={onPublish}
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white shadow-lg shadow-blue-500/25 border-0 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                Publishing...
                            </>
                        ) : (
                            <>
                                <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                                Publish Thread
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </header>
    );
}
