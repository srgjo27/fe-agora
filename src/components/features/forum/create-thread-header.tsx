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
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        onClick={onBack}
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <div className="h-4 w-px bg-slate-200" />
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100">
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Draft</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        onClick={onDiscard}
                    >
                        Discard
                    </Button>
                    <Button
                        onClick={onPublish}
                        disabled={isSubmitting}
                    >
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
